from rest_framework import serializers
from accounts.models import User

class CheckUserExistsSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=150)


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class SetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(required=True,min_length=5, max_length=20)
    password_confirm = serializers.CharField(required=True,min_length=5, max_length=20)

    def validate(self, attrs):
        password = attrs.get("password")
        password_confirm = attrs.get("password_confirm")

        if password != password_confirm:
            raise serializers.ValidationError({"password_confirm": "Passwords do not match"})

        return attrs

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)