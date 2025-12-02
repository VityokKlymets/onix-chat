import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from accounts.serializers import UserSerializer
from chat.models import ChatRoom, Message
from chat.serializers.message import MessageSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

ROOM_USERS = {}

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"
        user = self.scope["user"]

        if not user.is_authenticated:
            await self.close(code=4001)  # reject unauthenticated
            return

        self.user = user
        self.room, _ = await database_sync_to_async(ChatRoom.objects.get_or_create)(name=self.room_name)

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        users = ROOM_USERS.setdefault(self.room_name, set())
        users.add(self.user.username)

        serialized_user = await database_sync_to_async(lambda: UserSerializer(self.user).data)()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat.system",
                "event": "user_join",
                "user": serialized_user,
            }
        )

    async def disconnect(self, close_code):
        users = ROOM_USERS.get(self.room_name, set())
        users.discard(self.user.username)

        serialized_user = await database_sync_to_async(lambda: UserSerializer(self.user).data)()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat.system",
                "event": "user_leave",
                "user": serialized_user,
            }
        )

        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


    async def receive(self, text_data):
        data = json.loads(text_data)
        message_text = data.get("message", "").strip()
        if not message_text:
            return

        try:
            message = await database_sync_to_async(Message.objects.create)(
                room=self.room,
                user=self.user,
                content=message_text
            )
        except Exception as e:
            print(e)
            return

        serialized = MessageSerializer(message).data

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat.message",
                "message": serialized,
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "message",
            "message": event["message"]
        }))

    async def chat_system(self, event):
        await self.send(text_data=json.dumps(event))