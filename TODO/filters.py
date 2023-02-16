import django_filters
from django_filters import rest_framework as filters
from django_filters.widgets import RangeWidget

from .models import TODO, Project


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ["name"]


class TODOFilterDate(filters.FilterSet):
    created_at = django_filters.DateFromToRangeFilter(widget=RangeWidget(attrs={"type": "date"}))

    class Meta:
        model = TODO
        fields = ["project", "text", "updated_at", "user", "opened"]
