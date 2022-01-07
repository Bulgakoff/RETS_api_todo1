from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from .models import Project, ToDo, User, UserProject


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserSerializerBase(ModelSerializer):
    # QueryParameterVersioning
    class Meta:
        model = User
        fields = ('username',)


class ProjectSerializerBase(ModelSerializer):
    # QueryParameterVersioning
    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelSerializer(ModelSerializer):
    # user_id = UserModelSerializer()
    class Meta:
        model = Project
        fields = "__all__"


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = "__all__"


class UserProjectModelSerializer(ModelSerializer):
    user_id = UserModelSerializer()
    project_id = ProjectModelSerializer()
    todo_id = ToDoModelSerializer()
    class Meta:
        model = UserProject
        fields = "__all__"
