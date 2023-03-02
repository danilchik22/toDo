from rest_framework.serializers import ModelSerializer

from users.serializers import UserModelSerializer

from .models import TODO, Project


class ProjectModelSerializer(ModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = "__all__"


class BaseProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class TODOModelSerializer(ModelSerializer):
    class Meta:
        model = TODO
        fields = "__all__"
