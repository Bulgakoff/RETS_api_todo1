from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# from graphene_django.views import GraphQLView
from rest_framework import permissions
from django.urls import path, include, re_path
from rest_framework.authtoken import views

from rest_framework.routers import DefaultRouter

from mainapp.views import UserViewSet, TodoViewSet, \
    ProjectViewSet, UserProjectTasksViewSet

from django.contrib import admin

from userapp.views import UserListAPIView

schema_view = get_schema_view(
    openapi.Info(
        title="Blog_DRF_2",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()

router.register('user_base', UserViewSet)
router.register('todo_base', TodoViewSet)
router.register('pj_base', ProjectViewSet)
router.register('pj_to_users_base', UserProjectTasksViewSet)

urlpatterns = [
    # NamespaceVersioning
    path('api/users/0.1', include('userapp.urls', namespace='0.1')),
    path('api/users/0.2', include('userapp.urls', namespace='0.2')),
    # UrlPathVersioning
    re_path(r'^api_version/(?P<version>\d\.\d)/users/$', UserListAPIView.as_view()),
    #  swagger
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    #  redoc
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # ViewSets  :
    path('admin/', admin.site.urls),

    # ViewSets for router.  :
    path('viewsets/', include(router.urls)),  # 11111111111111111111111111111111111111111

    path('api-token-auth/', views.obtain_auth_token)

]
