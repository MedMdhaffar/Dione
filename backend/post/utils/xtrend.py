import requests
import time

def get_x_trends(apify_api_token, location):

    ACTOR_ID = "karamelo~twitter-trends-scraper"
    INPUT = {
        "location": location  # try "Worldwide", "Tunisia", "France", etc.
    }
    start_resp = requests.post(
        f"https://api.apify.com/v2/acts/{ACTOR_ID}/runs?token={apify_api_token}",
        json={"input": INPUT}
    )

    if "data" not in start_resp.json():
        print("Error starting actor:")
        print(start_resp.status_code)
        print(start_resp.text)
        exit(1)

    run_id = start_resp.json()["data"]["id"]
    status = "RUNNING"
    while status == "RUNNING":
        time.sleep(5)
        status = requests.get(
            f"https://api.apify.com/v2/actor-runs/{run_id}?token={apify_api_token}"
        ).json()["data"]["status"]

    results = requests.get(
        f"https://api.apify.com/v2/actor-runs/{run_id}/dataset/items?token={apify_api_token}"
    ).json()

    def parse_volume(v):
        if not v:
            return 0
        return int(v.replace("Tweets", "").replace(",", "").strip())

    trends_sorted = sorted(results, key=lambda t: parse_volume(t.get('volume')), reverse=True)

    # for i, trend in enumerate(trends_sorted[:10], 1):
    #     print(f"{i}. {trend['trend']} — {trend.get('volume', 'N/A')}")
    return trends_sorted[0]['trend']  



