

from django.urls import path, include
from .views import UserRegisterView, UserLoginView, UserLogoutView, UserDetailView, AllUsersview


urlpatterns = [
    path('registration/',UserRegisterView.as_view()),
    path('login/',UserLoginView.as_view()),
    path('logout/',UserLogoutView.as_view()),
    path('user/<int:id>/',UserDetailView.as_view()),
    path('allusers/', AllUsersview.as_view())
]
