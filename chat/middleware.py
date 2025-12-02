import urllib
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

User = get_user_model()

@database_sync_to_async
def get_user_from_token(token: str):
    try:
        access_token = AccessToken(token)
        print(token)
        print(access_token)
        user_id = access_token["user_id"]
        return User.objects.get(id=user_id)
    except Exception as ex:
        print(ex)
        return AnonymousUser()

class JWTAuthMiddleware(BaseMiddleware):
    """
    Custom Channels middleware to authenticate user using JWT from query string.
    """

    async def __call__(self, scope, receive, send):
        # Extract token from query string
        query_string = scope.get("query_string", b"").decode()
        params = urllib.parse.parse_qs(query_string)
        token_list = params.get("token")
        if token_list:
            token = token_list[0]
            scope["user"] = await get_user_from_token(token)
        else:
            scope["user"] = AnonymousUser()

        return await super().__call__(scope, receive, send)
