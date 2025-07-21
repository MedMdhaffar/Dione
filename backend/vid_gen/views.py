from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .utils.searchytrends import get_trending_videos
from .utils.Get_peak_video import download_peak_video

# Create your views here.
@api_view(["GET"])
def generate_video(request, topic):
    # while True:
        
    #     if len(videos) != 0:
    #         break
    #     else:
    #         nbr_videos+= 1    
    List_of_videos = get_trending_videos(5, topic)
    for video in List_of_videos:
        result = download_peak_video(video) 
    if result:
        return Response(
            {"message" : "Video Downloaded Successfully"},
            status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"message": "Failed to download Video"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )