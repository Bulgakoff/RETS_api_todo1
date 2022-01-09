from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from .models import Project, ToDo, User, UserProject


class UserModelSerializer(ModelSerializer):  # 1
    class Meta:
        model = User
        fields = "__all__"


class UserSerializerBase(ModelSerializer):
    # QueryParameterVersioning
    class Meta:
        model = User
        fields = ('username',)


class ProjectModelSerializer(ModelSerializer):  # 2
    class Meta:
        model = Project
        fields = "__all__"


class ToDoModelSerializer(ModelSerializer):  # 3
    class Meta:
        model = ToDo
        fields = "__all__"


class UserProjectModelSerializer(ModelSerializer):  # 4
    user_id = UserModelSerializer()
    project_id = ProjectModelSerializer()
    todo_id = ToDoModelSerializer()
    class Meta:
        model = UserProject
        fields = "__all__"


class UserProjectModelSerializerBase(ModelSerializer):
    # QueryParameterVersioning
    class Meta:
        model = UserProject
        fields = '__all__'
