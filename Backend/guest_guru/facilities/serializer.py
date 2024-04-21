from rest_framework import serializers  
from .models import Facility

class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = "__all__"

class FacilityEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ['name', 'description', 'price', 'image']
