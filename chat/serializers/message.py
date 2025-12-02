from rest_framework import serializers
from chat.models import  Message
from django.contrib.auth import get_user_model

User = get_user_model()

class MessageUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class MessageSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ["id", "content", "timestamp", "user"]

    def get_user(self, obj):
        if obj.user:
            return {"username": obj.user.username}
        return {"username": "Anonymous"}