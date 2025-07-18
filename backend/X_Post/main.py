from utils.groq_chat import groq_chat  # Import groq_chat from models.groq_chat
from utils.generate_image import generate_image  # Import generate_image from models.generate_image
from utils.xtrend import get_trends  # Import get_trends from models.xtrend
from utils.Twitter_post import post_to_twitter  # Import post_to_twitter from models.Twitter_post
import os
from dotenv import load_dotenv
load_dotenv()

from openai import OpenAI
import requests
import base64 

def get_res():
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    
    # change Your input text!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    post_TRENDS = get_trends()
    while True :
        post = groq_chat(GROQ_API_KEY, "in english give me post discription about this trends (without introduction) (don't mention the word trend)(the post must be less than 280 characters):" + post_TRENDS)
        if "<think>" in post:
            post = post.split("</think>")[-1].strip()
        if len(post) <= 280:
            break 

    image_description = groq_chat(GROQ_API_KEY, "In English, give me a concise image description about this post (the length must be between 1 and 1000) (characters without introductions)." + post)
    if "<think>" in image_description:
        image_description = image_description.split("</think>")[-1].strip()   
    generate_image(image_description)
    
    post_to_twitter(os.getenv("TWITTER_USERNAME"), os.getenv("TWITTER_PASSWORD"), post, "output.png")


if __name__ == "__main__":
    get_res()