from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from chat.models import ChatRoom
from chat.serializers.rooms import ChatRoomSerializer

class ChatRoomListView(generics.ListAPIView):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
