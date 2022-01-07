# from drf_yasg.views import get_schema_view
# from drf_yasg import openapi

from django.contrib import admin
from django.urls import path, include, re_path
# from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.authtoken import views

from rest_framework.routers import DefaultRouter

from mainapp.views import UserViewSet, TodoViewSet, ProjectViewSet, UserProjectTasksViewSet

from django.contrib import admin
from django.urls import path, include, re_path

router = DefaultRouter()

router.register('user_base', UserViewSet)
# router.register('user_base', UserViewSet, basename='ub')
router.register('todo_base', TodoViewSet)
# router.register('todo_base', TodoViewSet, basename='tb')
router.register('pj_base', ProjectViewSet)
# router.register('pj_base', ProjectViewSet, basename='pb')
router.register('pj_to_users_base', UserProjectTasksViewSet)
# router.register('pj_to_users_base', UserProjectTasksViewSet, basename='utpb')

urlpatterns = [

    # ViewSets  :
    path('admin/', admin.site.urls),


    # ViewSets for router.  :
    path('viewsets/', include(router.urls)),  # 11111111111111111111111111111111111111111


    path('api-token-auth/', views.obtain_auth_token)

]

