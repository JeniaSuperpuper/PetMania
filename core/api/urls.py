from django.urls import path, include
from . import views

app_name = 'appointment'

urlpatterns = [
    path('appointment/', views.AppointmentListView.as_view(), name='appointment_list'),
    path('appointment/<pk>/', views.AppointmentDetailView.as_view(), name='appointment_detail'),
    path('services/', views.ServisesListView.as_view(), name='services_list'),
    path('reviews/', views.ReviewsListView.as_view(), name='reviews_list'),
    path('contacts/', views.ContactsListView.as_view(), name='contacts_list'),
    path('header/', views.HeaderListView.as_view(), name='header_list'),
    path('', include('accounts.urls'))
]