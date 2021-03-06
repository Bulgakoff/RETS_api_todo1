from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import viewsets, mixins, permissions, status
from rest_framework.generics import CreateAPIView, ListAPIView, \
    RetrieveAPIView, DestroyAPIView, UpdateAPIView, \
    get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

# from .filters import  ProjectFilter
from .models import Project, ToDo, UserProject
from rest_framework.response import Response

from .serializer import ProjectModelSerializer, UserModelSerializer, \
    ToDoModelSerializer, \
    UserProjectModelSerializer, UserProjectModelSerializerBase, UserSerializerBase, UserSerializerIsSuperuserIsStaff


# ===== for User (User) ===========================================
# ViewSets (наборы представлений) позволяют объединять
# несколько представлений в один набор. (или нет)

class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = [AllowAny]
    serializer_class = UserModelSerializer
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '3.0':
            return UserSerializerIsSuperuserIsStaff
        if self.request.version == '2.0':
            return UserSerializerBase
        return UserModelSerializer


# ===========ToD o=======================
class TodoViewSet(viewsets.ModelViewSet):
    # permission_classes = [AllowAny]
    serializer_class = ToDoModelSerializer
    queryset = ToDo.objects.all()

# ==============Project===============================
class ProjectViewSet(viewsets.ModelViewSet):
    # permission_classes = [AllowAny]
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()

# ==============UserProjectTasks===============================
class UserProjectTasksViewSet(viewsets.ModelViewSet):
    # permission_classes = [AllowAny]
    serializer_class = UserProjectModelSerializer
    queryset = UserProject.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return UserProjectModelSerializer # get
        return UserProjectModelSerializerBase # post


