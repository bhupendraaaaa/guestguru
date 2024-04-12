from rest_framework import serializers
from .models import Booking, Room

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

    def get_fields(self, request):
        fields =  super().get_fields()
    
        if request and request.method == 'GET':
            fields['room'] = RoomSerializer()
            return super().get_fields()
        return fields

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_type', 'room_no', 'capacity', 'price', 'description', 'image')

class RoomEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_type', 'room_no', 'capacity', 'price', 'description', 'image')
