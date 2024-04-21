from django.db import models

# Create your models here.

class Facility(models.Model):
    name = models.CharField(max_length = 50)
    description = models.CharField(max_length = 100)
    price = models.IntegerField()
    image = models.ImageField( null=True)



