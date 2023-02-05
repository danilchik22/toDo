from django.core.management.base import BaseCommand

from users.models import CustomUser


class Command(BaseCommand):
    help = "Create super user and test users"

    def handle(self, *args, **kwargs):
        CustomUser.objects.create(username="super", password="super", email="s@mail.ru", is_staff=True)
        CustomUser.objects.create(username="test1", password="test1", email="s2@mail.ru", last_name="Дмитриев")
        CustomUser.objects.create(username="test2", password="test2", email="s3@mail.ru", first_name="Олег")
