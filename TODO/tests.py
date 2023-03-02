import json

from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import (APIClient, APIRequestFactory, APITestCase,
                                 force_authenticate)

from users.models import CustomUser

from .models import Project
from .views import ProjectModelViewSet, TODOModelViewSet


class TestProjectModelViewSet(TestCase):
    def setUp(self) -> None:
        self.username = "admin"
        self.password = "password"
        self.email = "email@mail.ru"
        self.admin = CustomUser.objects.create_superuser("admin", "password", "us@mail.ru")
        self.data = {"name": "Project", "url": "http://project.com", "users": [1]}
        self.data_put = {"name": "Puper", "url": "http://project.com", "users": [1]}
        self.urlProjects = "/api/projects/"

    def test_project_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.urlProjects)
        view = ProjectModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_project(self):
        client = APIClient()
        response = client.put(self.urlProjects, self.data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_project(self):
        client = APIClient()
        client.force_authenticate(self.admin)
        response = client.post(self.urlProjects, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        client.logout()

    def test_change_project(self):
        users = CustomUser.objects.filter(id=1)
        project = Project.objects.create(name="SuperProject", url="http://www.yandex.ru")
        project.users.add(*users)
        client = APIClient()
        client.force_authenticate(self.admin)
        response = client.put(f"{self.urlProjects}{project.id}/", self.data_put)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, "Puper")
        client.logout()


class TestToDOModelViewSet(APITestCase):
    def setUp(self) -> None:
        self.username = "admin"
        self.password = "password"
        self.email = "email@mail.ru"
        self.admin = CustomUser.objects.create_superuser("admin", "password", "us@mail.ru")
        self.url = "/api/TODOs/"

    def test_get_ToDo_guest_mixer(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_ToDo_quest(self):
        project = mixer.blend(Project)
        user = mixer.blend(CustomUser)
        response = self.client.post(self.url, {"text": "Привет", "project": project, "user": user})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_ToDo_auth(self):
        project = mixer.blend(Project)
        user = mixer.blend(CustomUser)
        self.client.force_authenticate(self.admin)
        response = self.client.post(self.url, {"text": "Привет", "project": f"{project.id}", "user": f"{user.id}"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
