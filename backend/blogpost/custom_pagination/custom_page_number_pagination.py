from rest_framework.pagination import PageNumberPagination


class myPagination(PageNumberPagination):
    page_size = 4