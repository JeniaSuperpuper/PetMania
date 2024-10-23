# Generated by Django 5.1.2 on 2024-10-20 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_services_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contacts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=250)),
                ('operating_mode', models.CharField(max_length=300)),
                ('phone_number', models.CharField(max_length=20)),
                ('instagram', models.CharField(max_length=200)),
                ('youtube', models.CharField(max_length=200)),
                ('facebook', models.CharField(max_length=200)),
            ],
        ),
        migrations.AlterField(
            model_name='services',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
