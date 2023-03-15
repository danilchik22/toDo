from django.contrib import admin

from .models import TODO, Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["name", "url", "get_users"]

    def get_users(self, obj):
        return "\n".join([p.username for p in obj.users.all()])


@admin.register(TODO)
class ToDoAdmin(admin.ModelAdmin):
    list_display = ["project", "text"]
