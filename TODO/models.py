from django.db import models

from users.models import CustomUser as user


class Project(models.Model):
    name = models.CharField(max_length=128)
    url = models.URLField(verbose_name="url")
    users = models.ManyToManyField(user)

    def __str__(self):
        return f"{self.name} | {self.url}"


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    user = models.ForeignKey(user, on_delete=models.CASCADE)
    opened = models.BooleanField(default=True)
