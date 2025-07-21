import requests

def post_to_twitter(access_token, post_text, image_path):
    # 1. Upload image
    with open(image_path, 'rb') as img:
        media_resp = requests.post(
            "https://upload.twitter.com/1.1/media/upload.json",
            headers={"Authorization": f"Bearer {access_token}"},
            files={"media": img}
        )
    if media_resp.status_code != 200:
        return False

    media_id = media_resp.json().get("media_id_string")

    # 2. Create tweet
    tweet_resp = requests.post(
        "https://api.twitter.com/2/tweets",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        },
        json={
            "text": post_text,
            "media": {"media_ids": [media_id]}
        }
    )
    return tweet_resp.ok
