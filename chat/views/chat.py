from rest_framework import generics
from chat.models import  ChatRoom
from chat.serializers.message import MessageSerializer

class ChatRoomMessagesView(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        room_name = self.kwargs['room_name']
        room = ChatRoom.objects.get(name=room_name)
        return room.messages.all()
