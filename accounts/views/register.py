from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from accounts.models import User
from accounts.serializers import UserSerializer

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({"success": True, "user": serializer.data}, status=status.HTTP_201_CREATED)
