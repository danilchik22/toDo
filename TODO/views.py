from rest_framework import generics, viewsets
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from .filters import ProjectFilter, TODOFilterDate
from .models import TODO, Project
from .serializers import ProjectModelSerializer, TODOModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class TODOModelViewSet(viewsets.ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TODOLimitOffsetPagination
    filterset_fields = "__all__"
    filterset_class = TODOFilterDate

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.opened = False
        instance.save(update_fields=["opened"])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)