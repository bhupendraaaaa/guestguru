from rest_framework import serializers
from .models import Booking, Room

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'user', 'room', 'check_in', 'check_out', 'guest_count', 'status')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_type', 'room_no', 'capacity', 'price', 'description', 'image')
