from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):

    def get_page_number(self, request, paginator):
        page_num = super(CustomPagination, self).get_page_number(request, paginator)
        self.pg_num = page_num 
        return page_num

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'page': self.pg_num,
            'count': self.page.paginator.count,
            'results': data
        })