from django.contrib import admin

from users import models as models_users


@admin.register(models_users.CustomUser)
class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "first_name", "last_name", "email"]
    ordering = ["username", "first_name", "last_name", "email"]
