from rest_framework import serializers
from .models import User

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
class UserModelLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 100)
    class Meta:
        model = User
        fields = ['email','password']

