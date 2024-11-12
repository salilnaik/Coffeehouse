from django.urls import path
from . import views

urlpatterns = [
    path("home/", views.GetAllPosts.as_view(), name="home-view"),
    path("currentuser/", views.CurrentUserView.as_view(), name="current-user"),
    path("posts/", views.PostListCreate.as_view(), name="post-list"),
    path("posts/<str:user>/", views.ViewPosts.as_view(), name="user-view"),
    path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="delete-post")
]