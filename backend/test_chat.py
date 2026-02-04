import requests
import json
import os

API_URL = "http://localhost:8000/api/v1/ai/chat/700ef3f0-b1e3-4da3-ae7f-6605e157c684"
payload = {"message": "Hello"}
headers = {"Content-Type": "application/json"}

try:
    print(f"Sending request to {API_URL}...")
    response = requests.post(API_URL, json=payload, headers=headers, stream=True)
    
    print(f"Status Code: {response.status_code}")
    
    if response.status_code != 200:
        print("Error Response:", response.text)
    else:
        print("Streaming response:")
        for line in response.iter_lines():
            if line:
                print(line.decode('utf-8'))

except Exception as e:
    print(f"Exception: {e}")
