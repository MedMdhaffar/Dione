from googleapiclient.discovery import build
import sys

from dotenv import load_dotenv
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')
load_dotenv()
API_KEY = os.getenv("YOUTUBE_API_KEY")
youtube = build("youtube", "v3", developerKey=API_KEY)

def get_trending_videos(max_results = 1,trends_to_search_for = "trendy cryptocurrency OR meme coins "):
    try:
        # Search for cryptocurrency-related videos
        request = youtube.search().list(
            part="snippet",
            q=trends_to_search_for,  # Searching for cryptocurrency-related terms
            type="video",  # Only return videos
            order="viewCount",  # Sort by view count to get the most popular ones
            regionCode="US",  # Only get results for the US
            maxResults=max_results
        )
        response = request.execute()
        list_of_videos = []
        if "items" not in response or not response["items"]:
            print("No cryptocurrency-related trending videos found.")
        else:
            for video in response["items"]:
                # Debugging
                # title = video["snippet"]["title"]
                # video_id = video["id"]["videoId"]
                # print(f"{title}")
                # print(f"Watch: https://www.youtube.com/watch?v={video_id}\n")
                video_id = video["id"]["videoId"]
                list_of_videos.append(f"https://www.youtube.com/watch?v={video_id}")
    except Exception as e:
        print(f"An error occurred: {e}")
    return list_of_videos


