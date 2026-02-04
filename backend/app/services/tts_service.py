import edge_tts
import os
import uuid

# Directory to store generated audio files
AUDIO_OUTPUT_DIR = "generated_audio"

if not os.path.exists(AUDIO_OUTPUT_DIR):
    os.makedirs(AUDIO_OUTPUT_DIR)

async def generate_speech(text: str, voice: str = "en-US-AriaNeural") -> str:
    """
    Generate speech audio from text using edge-tts.
    
    Args:
        text: Text to speak
        voice: Voice ID (default: en-US-AriaNeural)
        
    Returns:
        Path to the generated audio file (relative to backend root)
    """
    if not text or not text.strip():
        raise ValueError("Text cannot be empty")

    # Generate a fixed filename to prevent disk clutter
    # We use a single file 'tts_output.mp3' and overwrite it every time
    filename = "tts_output.mp3"
    output_path = os.path.join(AUDIO_OUTPUT_DIR, filename)
    
    # Ensure directory exists (just in case)
    if not os.path.exists(AUDIO_OUTPUT_DIR):
        os.makedirs(AUDIO_OUTPUT_DIR)
    
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_path)
    
    return output_path

def cleanup_old_files(max_files: int = 20):
    """
    Cleanup is now redundant as we use a single file.
    Kept for backward compatibility if needed.
    """
    pass
