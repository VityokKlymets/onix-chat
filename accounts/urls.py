from django.urls import path
from .views.me import CurrentUserView
from .views.user_exists import CheckUserExistsView
from .views.set_password import SetUserPasswordView
from .views.login import LoginView


urlpatterns = [
    path('check-user/', CheckUserExistsView.as_view(), name='check-user'),
    path('<str:username>/password/', SetUserPasswordView.as_view(), name='set-password'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', CurrentUserView.as_view(), name="current-user"),
]