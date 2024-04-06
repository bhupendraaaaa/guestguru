from django.db import models
from registration.models import User


# Create your models here.

class Room(models.Model):
    room_type = models.CharField(max_length=100)
    room_no = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField()
    price = models.FloatField()
    description = models.TextField(null=True, blank=True) 
    image = models.ImageField( null=True) 


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()
    guest_count = models.PositiveIntegerField()
    status = models.CharField(max_length=100, default='pending')
    
    






    
