from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    name = models.CharField(max_length=32, unique=True)

    # user_id = models.ForeignKey(User, on_delete=models.PROTECT)

    def __str__(self):
        return self.name




class ToDo(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    # project_id = models.ForeignKey(Project, on_delete=models.PROTECT)
    # user_id = models.ForeignKey(User, on_delete=models.PROTECT)


class UserProject(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    project_id = models.ForeignKey(Project, on_delete=models.PROTECT)
    todo_id = models.ForeignKey(ToDo, on_delete=models.PROTECT)
