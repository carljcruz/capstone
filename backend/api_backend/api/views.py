from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserListSerializer,
    PatientRegistrationSerializer,
    DoctorRegistrationSerializer,
    UpdatePatientSerializer,
    UpdateDoctorSerializer,
    PrescriptionSerializer,
    PrescriptionListSerializer,
    DoctorProfileSerializer,
)

from .models import User, Prescription, Patient, Doctor


class DoctorFilter(filters.FilterSet):
    specialization = filters.CharFilter(specialization='data__specialization')

    class Meta:
        model = Doctor
        fields = ['specialization', ]

# registration view


class UserRegistrationView(APIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            serializer.save()
            status_code = status.HTTP_201_CREATED

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User successfully registered!',
                'user': serializer.data
            }

            return Response(response, status=status_code)


class PatientRegistrationView(APIView):
    serializer_class = PatientRegistrationSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            serializer.save()
            status_code = status.HTTP_201_CREATED

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User successfully registered!',
                'user': serializer.data
            }

            return Response(response, status=status_code)


class DoctorRegistrationView(APIView):
    serializer_class = DoctorRegistrationSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            serializer.save()
            status_code = status.HTTP_201_CREATED

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User successfully registered!',
                'user': serializer.data
            }

            return Response(response, status=status_code)

# login view


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            status_code = status.HTTP_200_OK
            user = request.user

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User logged in successfully',
                'access': serializer.data['access'],
                'refresh': serializer.data['refresh'],
                'authenticatedUser': {
                    'email': serializer.data['email'],
                    'role': serializer.data['role'],
                }
            }

            return Response(response, status=status_code)


# user list view
class UserListView(APIView):
    serializer_class = UserListSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        if user.role != 1:
            response = {
                'success': False,
                'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this ction'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)
        else:
            users = User.objects.all()
            serializer = self.serializer_class(users, many=True)
            response = {
                'success': True,
                'status_code': status.HTTP_200_OK,
                'message': 'Successfully fetched users',
                'users': serializer.data

            }
            return Response(response, status=status.HTTP_200_OK)


class UpdatePatientProfileView(generics.UpdateAPIView):

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdatePatientSerializer


class UpdateDoctorProfileView(generics.UpdateAPIView):

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateDoctorSerializer


# sample test view
class HelloView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        content = {'message': 'Request granted po hello'}
        return Response(content)


# get user api
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = PatientRegistrationSerializer

    def get_object(self):
        return self.request.user


# get user api doctor
class DoctorUserAPI(generics.RetrieveAPIView):
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = DoctorRegistrationSerializer

    def get_object(self):
        return self.request.user


class GetRole(generics.RetrieveAPIView):
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = UserListSerializer

    def get_object(self):
        return self.request.user


class MakePrescription(generics.CreateAPIView):
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = PrescriptionSerializer

    def get_object(self):
        return self.request.user


class GetPrescriptions(generics.ListAPIView):
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = PrescriptionSerializer
    # lookup_field = 'user'

    def get_queryset(self):
        user = self.request.user
        return Prescription.objects.filter(owner=user)


class GetSinglePrescription(generics.RetrieveAPIView):
    queryset = Prescription.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = PrescriptionSerializer
    # lookup_field = 'user'


class DoctorList(generics.ListAPIView):
    queryset = Doctor.objects.all()
    permission_classes = [IsAuthenticated, ]
    serializer_class = DoctorProfileSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = {'specialization'}


class GetSingleDoctor(generics.RetrieveAPIView):
    queryset = Doctor.objects.all()
    permission_classes = [AllowAny, ]
    serializer_class = DoctorProfileSerializer
    # filter_backends = (filters.DjangoFilterBackend,)
    # filterset_fields = {'pk'}