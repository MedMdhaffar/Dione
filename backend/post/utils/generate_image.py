import requests
import base64  # <-- Add this import
import os
from dotenv import load_dotenv
load_dotenv()

def generate_image(prompt: str):
    API_KEY = os.getenv("IMAPIKEY")
    ENGINE_ID = "stable-diffusion-v1-6"


    response = requests.post(
        f"https://api.stability.ai/v1/generation/{ENGINE_ID}/text-to-image",
        headers={"Authorization": f"Bearer {API_KEY}"},
        json={
            "text_prompts": [{"text": prompt}],
            "height": 512,
            "width": 512,
            "samples": 1,
        },
    )
    
    if response.status_code == 200:
        data = response.json()
        # Extract Base64 image data
        image_data = data["artifacts"][0]["base64"]
        
        # Decode and save the image
        with open("output.png", "wb") as f:
           f.write(base64.b64decode(image_data))  # <-- Use base64.b64decode
           return image_data
        print("Image loaded successfully!")
    else:
        print(f"Error: {response.status_code}, {response.text}")

      