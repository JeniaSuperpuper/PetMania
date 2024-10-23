from django.contrib import admin
from .models import Appointment, Services, Reviews, Contacts, Header


# Register your models here.


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = [ 'pet_name', 'phone_number', 'email', 'date', 'time', 'author', 'status']
    list_filter = ['date', 'pet_name']
    list_editable = ['status']

# admin.site.register(Appointment)
@admin.register(Services)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'price', 'is_active']
    list_filter = ['price', 'title']
    list_editable = ['is_active']

# admin.site.register(Services)
admin.site.register(Reviews)
admin.site.register(Contacts)
admin.site.register(Header)
