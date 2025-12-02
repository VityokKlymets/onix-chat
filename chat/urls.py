from django.urls import path
from chat.views.chat import ChatRoomMessagesView
from chat.views.chat_users import ChatRoomUserListView
from chat.views.rooms import ChatRoomListView

urlpatterns = [
    path("<str:room_name>/messages/", ChatRoomMessagesView.as_view(), name="chat-messages"),
    path("<str:room_name>/users/", ChatRoomUserListView.as_view(), name="chat-users"),
    path("rooms/", ChatRoomListView.as_view(), name="chat-rooms"),
]
