from rest_framework import generics
from .models import Appointment, Services, Reviews, Contacts, Header
from .serializers import AppointmentSerializer, ServicesSerializer, ReviewsSerializer, ContactsSerializer, \
    HeaderSerializer


# Create your views here.

class AppointmentListView(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentDetailView(generics.RetrieveAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class ServisesListView(generics.ListAPIView):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer


class ReviewsListView(generics.ListCreateAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer

class ContactsListView(generics.ListAPIView):
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializer

class HeaderListView(generics.ListAPIView):
    queryset = Header.objects.all()
    serializer_class = HeaderSerializer