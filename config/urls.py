from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from TODO.views import ProjectModelViewSet, TODOModelViewSet
from users.views import UserCustomViewSet

router = DefaultRouter()
router.register("users", UserCustomViewSet)
router.register("projects", ProjectModelViewSet)
router.register("TODOs", TODOModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="ToDoApp",
        default_version="1.0",
        description="Documentation to out project",
        contact=openapi.Contact(email="loginadanil.ru@mail.ru"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    re_path(r"^swagger(?P<format>\.json|\.yaml)$", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),
    path("api-token-auth/", views.obtain_auth_token),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
