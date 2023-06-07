from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import *
from .serializers import BlogPostSerializer
from rest_framework import filters
from rest_framework_simplejwt.authentication import JWTAuthentication
from .custom_permissions import *
from .custom_permissions import IsAuthorOrReadOnly
from django.db import connection
from .custom_pagination.custom_page_number_pagination import myPagination
class BlogPostListCreateApiView(generics.ListCreateAPIView):
    serializer_class = BlogPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['title', 'author__username', 'publication_date']
    search_fields = ['title', 'author__username', 'content', 'publication_date']
    pagination_class = myPagination

    def get_queryset(self):
        with connection.cursor() as cursor:
            cursor.callproc('get_all_blog_posts')
            blog_posts = cursor.fetchall()
            return BlogPost.objects.filter(id__in=[blog[0] for blog in blog_posts]).order_by('-publication_date')
        
    def perform_create(self, serializer):
        serializer.save(author = self.request.user)
    
class BlogPostUpdateRetrieveDestroyApiView(generics.RetrieveUpdateDestroyAPIView ):
    serializer_class = BlogPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]

    def get_queryset(self):
        with connection.cursor() as cursor:
            cursor.callproc('get_all_blog_posts')
            blog_posts = cursor.fetchall()
            return BlogPost.objects.filter(id__in=[blog[0] for blog in blog_posts])
        

    def perform_update(self, serializer):
        serializer.save(author = self.request.user)