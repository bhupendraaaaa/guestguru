from django.urls import path, include
from .views import *


urlpatterns = [
    path('registration/',UserRegisterView.as_view()),
    path('login/',UserLoginView.as_view()),
    path('logout/',UserLogoutView.as_view()),
    path('user/<int:id>/',UserDetailView.as_view()),
    path('allusers/', AllUsersview.as_view()),
    path('admincheck/', AdminCheck.as_view()),
    path('usercheck/', UserCheck.as_view()),
    path('useredit/<int:id>/', UserEditView.as_view()),
]
