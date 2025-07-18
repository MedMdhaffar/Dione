import base64
import hashlib
import secrets
import requests
from urllib.parse import urlencode

from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .utils.groq_chat import groq_chat  
from .utils.generate_image import generate_image  
from .utils.xtrend import get_x_trends  

import json
import base64

@api_view(['GET'])
def start_twitter_auth(request):
    code_verifier = base64.urlsafe_b64encode(secrets.token_bytes(32)).rstrip(b"=").decode()
    code_challenge = base64.urlsafe_b64encode(
        hashlib.sha256(code_verifier.encode()).digest()
    ).rstrip(b"=").decode()
    
    # Encode code_verifier inside the state param as JSON base64
    state_data = {"code_verifier": code_verifier, "nonce": secrets.token_hex(8)}
    state_str = base64.urlsafe_b64encode(json.dumps(state_data).encode()).decode().rstrip("=")

    params = {
        "response_type": "code",
        "client_id": settings.TWITTER_CLIENT_ID,
        "redirect_uri": settings.TWITTER_REDIRECT_URI,
        "scope": "tweet.read tweet.write users.read offline.access",
        "state": state_str,
        "code_challenge": code_challenge,
        "code_challenge_method": "S256",
    }
    url = "https://twitter.com/i/oauth2/authorize?" + urlencode(params)
    return Response({"auth_url": url})



@api_view(['GET'])
def twitter_callback(request):
    code = request.GET.get('code')
    state_str = request.GET.get('state')
    if not state_str:
        return Response({"error": "Missing state parameter"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Decode the state param
    import json, base64
    padding = '=' * (-len(state_str) % 4)  # add base64 padding
    state_data = json.loads(base64.urlsafe_b64decode(state_str + padding).decode())
    code_verifier = state_data.get("code_verifier")

    if not code_verifier:
        return Response({"error": "Missing code verifier"}, status=status.HTTP_400_BAD_REQUEST)

    token_resp = requests.post(
        "https://api.twitter.com/2/oauth2/token",
        data={
            "client_id": settings.TWITTER_CLIENT_ID,
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": settings.TWITTER_REDIRECT_URI,
            "code_verifier": code_verifier,
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    if token_resp.status_code != 200:
        return Response({"error": "Token exchange failed", "details": token_resp.text}, status=status.HTTP_400_BAD_REQUEST)
    
    APIFY_API_KEY = settings.APIFY_API_KEY
    
    trend = get_x_trends(APIFY_API_KEY, "Worldwide")

    GROQ_API_KEY = settings.GROQ_API_KEY
    while True :
        post = groq_chat(GROQ_API_KEY, "in english give me post discription about this trends (without introduction) (don't mention the word trend)(the post must be less than 280 characters):" + trend)
        if "<think>" in post:
            post = post.split("</think>")[-1].strip()
        if len(post) <= 280:
            break   
    tokens = token_resp.json()
    access_token = tokens["access_token"]
    
    # Post tweet 
    tweet_resp = requests.post(
        "https://api.twitter.com/2/tweets",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        },
        json={
            "text": post
        }
    )

    if tweet_resp.status_code == 201:
        data = tweet_resp.json()
        return Response({
            "success": True,
            "message": "Tweet posted!",
            "tweet_id": data["data"]["id"]
        })
    else:
        return Response({
            "error": "Failed to post tweet",
            "details": tweet_resp.text
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
