import graphene
from graphene_django import DjangoObjectType

from users.models import CustomUser

from .models import TODO, Project


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class ToDoType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = "__all__"


class Query(graphene.ObjectType):
    all_todos = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    to_do_by_id = graphene.Field(ToDoType, id=graphene.Int(required=True))
    projects_by_username = graphene.List(ProjectType, username=graphene.String(required=False))

    def resolve_all_todos(root, info):
        return TODO.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_to_do_by_id(self, info, id):
        try:
            return TODO.objects.get(id=id)
        except:
            return None

    def resolve_projects_by_username(root, info, username):
        projects = Project.objects.all()
        if username:
            user = CustomUser.objects.get(username=username)
            rojects = Project.objects.filter(users=user.id)
        return projects


class UpdateToDoMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        text = graphene.String(required=True)

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, id, text):
        todo_obj = TODO.objects.get(pk=id)
        todo_obj.text = text
        todo_obj.save()
        return UpdateToDoMutation(todo=todo_obj)


class Mutation(graphene.ObjectType):
    update_todo = UpdateToDoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
