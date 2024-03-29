from django.shortcuts import render

from rest_framework.generics import CreateAPIView
from .serializer import UserModelSerializer, UserModelLoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User


# Create your views here.

class UserRegisterView(CreateAPIView):
    serializer_class = UserModelSerializer


class UserLoginView(APIView):
    def post(self, request):
        serializer = UserModelLoginSerializer(data = request.data)
        if serializer.is_valid():
            email = request.data.get('email')
            password = request.data.get('password')
            try:
                user = User.objects.get(email = email, password = password) #orm
            except:
                user = None
            if user:
                refresh = RefreshToken.for_user(user=user)
                if user.role.lower() == 'staff':
                    refresh['role'] = 'staff'
                else:
                    refresh['role'] = 'guest'
                access_token = str(refresh.access_token)
                response= Response({'msg':'Login Successful','token':access_token}, status=status.HTTP_200_OK)
                response.set_cookie(key='token', value=access_token, secure=True, httponly=True, samesite='None')
                return response
            else:
                return Response({"msg":"Invalid Id or Password"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)