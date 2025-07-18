from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def get_trends():
    # Set up Chrome options
    options = Options()
    options.add_argument("--headless")  # Enable headless mode
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    )

    service = Service("/usr/local/bin/chromedriver")

    driver = webdriver.Chrome(service=service, options=options)

    try:
        driver.get("https://trends24.in/united-states/los-angeles/")

        trend_container = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, ".px-2.scroll-smooth.flex.gap-x-4.w-fit.pt-8")
            )
        )

        trends_dict = {}

        list_containers = trend_container.find_elements(By.CSS_SELECTOR, ".list-container")
        for list_container in list_containers:
            trend_lists = list_container.find_elements(By.CSS_SELECTOR, ".trend-card__list")
            for trend_list in trend_lists:
                try:
                    trend_name = trend_list.find_element(
                        By.CSS_SELECTOR, ".trend-name .trend-link"
                    ).text
                    tweet_count = trend_list.find_element(
                        By.CSS_SELECTOR, ".tweet-count"
                    ).text

                    if "K" in tweet_count:
                        tweet_count = int(float(tweet_count.replace("K", "")) * 1000)
                    else:
                        tweet_count = int(tweet_count)

                    trends_dict[trend_name] = tweet_count

                except Exception:
                    continue

        sorted_trends = sorted(trends_dict.items(), key=lambda x: x[1], reverse=True)
        top_trends_list = [trend for trend, count in sorted_trends[:5]]
        return top_trends_list[0]

    except Exception as e:
        print("Error:", e)
        return []

    finally:
        driver.quit()
