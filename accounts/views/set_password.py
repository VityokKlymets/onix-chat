from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from accounts.serializers import SetPasswordSerializer

User = get_user_model()

class SetUserPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, username):
        serializer = SetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data["password"]

        user, created = User.objects.get_or_create(username=username)

        user.set_password(password)
        user.save()

        if created:
            message = "User created and password set successfully"
            status_code = status.HTTP_201_CREATED
        else:
            message = "Password updated successfully"
            status_code = status.HTTP_200_OK

        return Response({"message": message, "username": user.username}, status=status_code)
