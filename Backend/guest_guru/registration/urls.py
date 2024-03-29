

from django.urls import path, include
from .views import UserRegisterView, UserLoginView

urlpatterns = [
    path('registration/',UserRegisterView.as_view()),
    path('login/',UserLoginView.as_view()),
]
