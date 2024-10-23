from rest_framework import serializers
from .models import Appointment, Services, Reviews, Contacts, Header


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'

class ReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'

class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields  ='__all__'

class HeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Header
        fields = '__all__'