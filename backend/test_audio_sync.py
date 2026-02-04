import urllib.request
import urllib.parse
import json
import wave
import struct
import math
import os
import mimetypes

# Configuration
API_URL = "http://localhost:8000/api/v1/phoneme/audio-to-visemes"
TEST_FILE = "test_audio.wav"

def generate_test_wav(filename):
    """Generate a simple WAV file with some sound"""
    print(f"Generating test audio: {filename}")
    sample_rate = 16000
    duration = 2.0  # seconds
    frequency = 440.0  # Hz (A4)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        
        num_samples = int(sample_rate * duration)
        
        for i in range(num_samples):
            # Generate a sine wave
            value = int(32767.0 * math.sin(2.0 * math.pi * frequency * i / sample_rate))
            data = struct.pack('<h', value)
            wav_file.writeframes(data)

def encode_multipart_formdata(fields, files):
    boundary = '----------BoundaryForMultipartRequest'
    crm = []
    
    for (key, value) in fields.items():
        crm.append('--' + boundary)
        crm.append('Content-Disposition: form-data; name="%s"' % key)
        crm.append('')
        crm.append(value)
        
    for (key, filename, data) in files:
        crm.append('--' + boundary)
        crm.append('Content-Disposition: form-data; name="%s"; filename="%s"' % (key, filename))
        crm.append('Content-Type: %s' % (mimetypes.guess_type(filename)[0] or 'application/octet-stream'))
        crm.append('')
        crm.append(data) # This must be bytes
        
    crm.append('--' + boundary + '--')
    crm.append('')
    
    # helper to bytes
    body = b''
    for item in crm:
        if isinstance(item, str):
            body += item.encode('utf-8') + b'\r\n'
        else: # data
            body += item + b'\r\n'
            
    return body, boundary

def test_endpoint():
    try:
        if not os.path.exists(TEST_FILE):
            generate_test_wav(TEST_FILE)
            
        print(f"Sending request to {API_URL}...")
        
        with open(TEST_FILE, 'rb') as f:
            file_content = f.read()
            
        body, boundary = encode_multipart_formdata({}, [('file', TEST_FILE, file_content)])
        
        req = urllib.request.Request(API_URL, data=body)
        req.add_header('Content-Type', 'multipart/form-data; boundary=%s' % boundary)
        
        try:
            with urllib.request.urlopen(req) as response:
                status_code = response.getcode()
                print(f"Status Code: {status_code}")
                
                result = response.read()
                data = json.loads(result)
                print("✅ Success! Response:")
                print(f"Received {len(data)} visemes")
                for i, v in enumerate(data[:5]):
                    print(f"  {i}: {v}")
                    
        except urllib.error.HTTPError as e:
            print(f"❌ HTTP Error: {e.code}")
            print(e.read().decode('utf-8'))
        except urllib.error.URLError as e:
            print(f"❌ URL Error: {e.reason}")
            
    except Exception as e:
        print(f"❌ Exception: {e}")
    finally:
        if os.path.exists(TEST_FILE):
            try:
                os.remove(TEST_FILE)
            except:
                pass

if __name__ == "__main__":
    test_endpoint()

