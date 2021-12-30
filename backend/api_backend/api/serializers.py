from .models import User, Patient, Doctor, Prescription
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'password'
        )

    def create(self, validated_data):
        auth_user = User.objects.create_user(**validated_data) # type:ignore
        auth_user.role = 1
        auth_user.save()
        return auth_user


# patient profile serializer

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('bio', 'age', 'first_name', 'last_name')


class PatientRegistrationSerializer(serializers.ModelSerializer):
    patient_profile = ProfileSerializer(required=True)

    class Meta:
        model = User
        fields = (
            'email',
            'password',
            'patient_profile',

        )

    def create(self, validated_data):
        auth_user = User.objects.create_user( # type:ignore
            email=validated_data['email'],
            password=validated_data['password'],
        )
        auth_user.role = 2
        auth_user.save()

        patient_profile = validated_data.pop('patient_profile')
        patient = Patient.objects.create(user=auth_user, 
                                         bio=patient_profile['bio'],
                                         age=patient_profile['age'],
                                         first_name=patient_profile['first_name'],
                                         last_name=patient_profile['last_name'])
        print(patient)

        return auth_user


class ChoiceField(serializers.ChoiceField):

    def to_representation(self, obj):
        if obj == '' and self.allow_blank:
            return obj
        return self._choices[obj]

    def to_internal_value(self, data):
        # To support inserts with the value
        if data == '' and self.allow_blank:
            return ''

        for key, val in self._choices.items():
            if val == data:
                return key
        self.fail('invalid_choice', input=data)


class DoctorProfileSerializer(serializers.ModelSerializer):
    specialization = serializers.ChoiceField(
        choices=Doctor.SPECIALIZATION_CHOICES)

    class Meta:
        model = Doctor

        fields = ('bio', 'age', 'first_name', 'last_name',
                  'specialization', 'education', 'id', 'user', 'user_email')
        # fields = '__all__'
    user_email = serializers.SerializerMethodField('get_user_email')

    def get_user_email(self, obj):
        return obj.user.email


class DoctorRegistrationSerializer(serializers.ModelSerializer):
    doctor_profile = DoctorProfileSerializer(required=True)

    class Meta:
        model = User
        fields = (
            'email',
            'password',
            'doctor_profile'
        )

    def create(self, validated_data):
        auth_user = User.objects.create_user( #type:ignore
            email=validated_data['email'],
            password=validated_data['password'],
        )
        auth_user.role = 3
        auth_user.save()

        doctor_profile = validated_data.pop('doctor_profile')
        doctor = Doctor.objects.create(user=auth_user,
                                       bio=doctor_profile['bio'],
                                       age=doctor_profile['age'],
                                       first_name=doctor_profile['first_name'],
                                       last_name=doctor_profile['last_name'],
                                       specialization=doctor_profile['specialization'],
                                       education=doctor_profile['education'])
        print(doctor)
        return auth_user

# serializer user login


class UserLoginSerializer(serializers.Serializer):
    # id = serializers.IntegerField(required=False)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    role = serializers.CharField(read_only=True)

    def create(self, validated_date):
        print(validated_date)
        pass

    def update(self, instance, validated_data):
        print(instance, validated_data)
        pass

    def validate(self, data):
        email = data['email']
        password = data['password']
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials")

        try:
            refresh = RefreshToken.for_user(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)

            update_last_login(None, user) # type:ignore

            validation = {
                'access': access_token,
                'refresh': refresh_token,
                'email': user.email, # type:ignore
                'role': user.role, # type:ignore
                # 'id': user.id
            }

            return validation
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid login credentials")


# serializing returning user list
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'role',
        )


class UpdatePatientSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='patient_profile.first_name')
    last_name = serializers.CharField(source='patient_profile.last_name')
    bio = serializers.CharField(source='patient_profile.bio')
    age = serializers.CharField(source='patient_profile.age')

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name',
                  'last_name', 'bio', 'age']

    def save(self, **kwargs):
        patient_profile = self.validated_data.pop('patient_profile') # type:ignore
        instance = super().save(**kwargs)
        Patient.objects.update_or_create(
            user=instance, defaults=patient_profile)
        return instance


class UpdateDoctorSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='doctor_profile.first_name')
    last_name = serializers.CharField(source='doctor_profile.last_name')
    bio = serializers.CharField(source='doctor_profile.bio')
    age = serializers.CharField(source='doctor_profile.age')
    credentials = serializers.CharField(source='doctor_profile.credentials')
    education = serializers.CharField(source='doctor_profile.education')

    # test commit
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name',
                  'last_name', 'bio', 'age', 'specialization', 'education']

    def save(self, **kwargs):
        doctor_profile = self.validated_data.pop('doctor_profile') # type:ignore
        instance = super().save(**kwargs)
        Doctor.objects.update_or_create(user=instance, defaults=doctor_profile)
        return instance

# TODO: Make this expire in 5 days
class PrescriptionSerializer(serializers.ModelSerializer):
    """ Somthing """
    model = Prescription
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Prescription
        fields = ['owner', 'id', 'prescription_name', 'prescription_details']


# Prescription List Serializers
class PrescriptionListSerializer(serializers.ModelSerializer):

    class Meta:

        model = User
        fields = ['prescriptions.prescription_name', ]

