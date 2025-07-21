from dotenv import load_dotenv
import os
from playwright.sync_api import Playwright, sync_playwright, expect
import time

load_dotenv()

def post_to_twitter(username, password, post_text, image_path):

    def run(playwright: Playwright) -> None:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        page.set_default_timeout(60000)  

        try:
            page.goto("https://twitter.com/login")
            print("Navigated to Twitter login page")

            # Fill in username
            page.get_by_label("Phone, email, or username").fill(username)
            print("Filled in username")
            time.sleep(2)  

            # Click Next button
            page.get_by_role("button", name="Next").click()
            print("Clicked Next button")
            time.sleep(2)

            # Fill in password
            page.get_by_label("Password", exact=True).fill(password)
            print("Filled in password")
            time.sleep(2)

            # Click login button
            page.get_by_test_id("LoginForm_Login_Button").click()
            print("Clicked login button")
            time.sleep(5)  

            # Handle 2FA prompt if it appears
            try:
                # Check if the 2FA prompt is visible
                if page.get_by_text("Two-factor authentication").is_visible(timeout=5000):
                    print("2FA prompt detected. Closing it...")
                    # Close the 2FA prompt (assuming there's a close button)
                    page.get_by_role("button", name="Close").click()
                    print("2FA prompt closed")
                    time.sleep(2)
            except Exception as e:
                print(f"No 2FA prompt detected. Proceeding... Error: {e}")
                

            # Handle OTP input if required
            try:
                expect(page.get_by_test_id("ocfEnterTextTextInput")).to_be_visible(timeout=60000)
                print("OTP input field is visible")

                page.get_by_test_id("ocfEnterTextTextInput").click()
                print("Filled in OTP")
                
                page.get_by_test_id("ocfEnterTextNextButton").click()
                print("Clicked OTP Next button")
                time.sleep(2)
            except Exception:
                print("OTP input field not found. Proceeding without OTP.")
               

            # Ensure tweet textarea is visible
            expect(page.get_by_test_id("tweetTextarea_0")).to_be_visible(timeout=60000)
            print("Tweet textarea is visible")

            # Fill in tweet text
            page.get_by_test_id("tweetTextarea_0").fill(post_text)
            print("Filled in tweet text")
            time.sleep(2)

            # Upload image
            page.get_by_test_id("fileInput").set_input_files(image_path)
            print("Uploaded image")
            time.sleep(2)

            # Post the tweet
            page.get_by_test_id("tweetButtonInline").click()
            print("Tweet with image posted successfully")
            time.sleep(5)  
            return True

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="error_screenshot.png")
            print("Screenshot saved as error_screenshot.png")
            return False

        finally:
            context.close()
            browser.close()
            print("Browser closed")

    with sync_playwright() as playwright:
        return run(playwright)