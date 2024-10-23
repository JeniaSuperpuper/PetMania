from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Appointment(models.Model):

    class Status(models.TextChoices):
        APPROVED = "AP", 'Approved'
        REJECTED = 'RJ', "Rejected"

    pet_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=16)
    email = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name='core_appointments')
    status = models.CharField(max_length=2, choices=Status.choices, default=Status.REJECTED)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)


    def __str__(self):
        return self.pet_name

class Services(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField()

    def __str__(self):
        return self.title

class Reviews(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

class Contacts(models.Model):
    address = models.CharField(max_length=250)
    operating_mode = models.CharField(max_length=300)
    phone_number = models.CharField(max_length=20)
    instagram = models.CharField(max_length=200)
    youtube = models.CharField(max_length=200)
    facebook = models.CharField(max_length=200)

class Header(models.Model):
    city = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    slogan = models.CharField(max_length=250)

