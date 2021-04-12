import uuid

from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from django.conf import settings

from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):

    ADMIN = 1
    PATIENT = 2
    DOCTOR = 3

    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (PATIENT, 'Patient'),
        (DOCTOR, 'Doctor')
    )

    uid = models.UUIDField(unique=True, editable=False,
                           default=uuid.uuid4, verbose_name='Public identifier')
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=timezone.now)
    modified_date = models.DateTimeField(default=timezone.now)
    created_by = models.EmailField()
    modified_by = models.EmailField()
    role = models.PositiveSmallIntegerField(
        choices=ROLE_CHOICES, blank=True, null=True, default=3)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                null=True,
                                related_name='patient_profile')
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    age = models.CharField(max_length=3)
    bio = models.CharField(max_length=100)

    def __str__(self):
        return self.user.email


class Doctor(models.Model):

    ALLERGISTS = 'Allergists'
    ANESTHESIOLOGISTS = 'Anesthesiologists'
    CARDIOLOGISTS = 'Cardiologists'
    COLON_SURGEONS = 'Colon Surgeons'
    CRITICAL_CARE_MEDICINE_SPECIALISTS = 'Critical Care Medicine Specialist'

    SPECIALIZATION_CHOICES = [
        (ALLERGISTS, 'ALLERGISTS'),
        (ANESTHESIOLOGISTS, 'ANESTHESIOLOGISTS'),
        (CARDIOLOGISTS, 'CARDIOLOGISTS'),
        (COLON_SURGEONS, 'COLON_SURGEONS'),
        (CRITICAL_CARE_MEDICINE_SPECIALISTS, 'CRITICAL_CARE_MEDICINE_SPECIALISTS'),

    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                null=True,
                                related_name='doctor_profile')
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    age = models.CharField(max_length=3)
    bio = models.CharField(max_length=100)
    specialization = models.CharField(
        max_length=50, blank=True, choices=SPECIALIZATION_CHOICES, default=ALLERGISTS)
    education = models.CharField(max_length=20)

    def __str__(self):
        return self.user.email

class Prescription(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='prescriptions')
    prescription_name = models.CharField(max_length=100)
    prescription_details = models.CharField(max_length=100)

    def __str__(self):
        return self.prescription_name

