from rest_framework import serializers
from chat.models import ChatRoom
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatRoomSerializer(serializers.ModelSerializer):
    unread = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = ["id", "name", "unread"]

    def get_unread(self, obj):
        user = self.context.get("request").user
        if not user.is_authenticated:
            return 0
        # count messages in this room that the user hasn't read
        # For simplicity, here we count all messages (you can extend with a Read model)
        return obj.messages.exclude(user=user).count()
