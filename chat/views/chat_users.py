from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from accounts.serializers import UserSerializer
from django.contrib.auth import get_user_model
from chat.consumers.chat import ROOM_USERS

User = get_user_model()

class ChatRoomUserListView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, room_name):
        usernames = ROOM_USERS.get(room_name, set())
        users = User.objects.filter(username__in=usernames)
        serializer = UserSerializer(users, many=True, context={"request": request})
        return Response(serializer.data)