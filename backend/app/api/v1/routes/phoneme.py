from fastapi import APIRouter, HTTPException, UploadFile, File, Request
from app.schemas.phoneme import PhonemeRequest, PhonemeResponse, VisemeFrame
from typing import List
from app.services.phoneme_service import (
    text_to_phonemes,
    text_to_viseme_sequence,
    estimate_duration
)

router = APIRouter()


@router.post("/text-to-visemes", response_model=PhonemeResponse)
async def convert_text_to_visemes(request: PhonemeRequest):
    """
    Convert text to timed viseme sequence using Phonemizer
    
    Args:
        request: PhonemeRequest containing text and optional language
    
    Returns:
        PhonemeResponse with IPA phonemes and viseme sequence
    
    Example:
        POST /api/v1/phoneme/text-to-visemes
        {
            "text": "hello world",
            "language": "en-us"
        }
    """
    try:
        # Validate input
        if not request.text or request.text.strip() == '':
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        # Get IPA phonemes
        phonemes = text_to_phonemes(request.text, request.language)
        
        # Convert to viseme sequence
        viseme_data = text_to_viseme_sequence(request.text, request.language)
        
        # Convert to Pydantic models
        visemes = [VisemeFrame(**v) for v in viseme_data]
        
        # Calculate total duration
        total_duration = estimate_duration(request.text, request.language)
        
        return PhonemeResponse(
            text=request.text,
            phonemes=phonemes,
            visemes=visemes,
            total_duration=total_duration
        )
    
    except Exception as e:
        # Log error and return meaningful message
        print(f"Error in text-to-visemes: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to convert text to visemes: {str(e)}"
        )


@router.post("/audio-to-visemes", response_model=List[VisemeFrame])
async def convert_audio_to_visemes(file: UploadFile = File(...)):
    """
    Convert audio file (WAV/MP3) to timed viseme sequence using Allosaurus
    
    Args:
        file: Audio file upload
    
    Returns:
        List of viseme frames with precise timing
    """
    import tempfile
    import os
    import shutil
    from app.services.phoneme_service import audio_to_visemes
    
    temp_file_path = None
    try:
        # Create temp file
        suffix = os.path.splitext(file.filename)[1]
        if not suffix:
            suffix = ".wav" # Default to wav if no extension
            
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
            shutil.copyfileobj(file.file, temp_file)
            temp_file_path = temp_file.name
            
        # Process audio
        visemes = audio_to_visemes(temp_file_path)
        
        # Convert to response model (VisemeFrame)
        # VisemeFrame expects: viseme, start, duration
        return [VisemeFrame(**v) for v in visemes]
        
    except Exception as e:
        print(f"❌ Error in audio-to-visemes: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process audio: {str(e)}"
        )
    finally:
        # Cleanup temp file
        if temp_file_path and os.path.exists(temp_file_path):
            try:
                os.unlink(temp_file_path)
            except:
                pass


@router.get("/health")
async def phoneme_health_check():
    """
    Health check endpoint for phoneme service
    
    Returns:
        Status of the phoneme service
    """
    try:
        # Test phonemizer with a simple word
        test_phonemes = text_to_phonemes("test", "en-us")
        
        return {
            "status": "healthy",
            "backend": "espeak",
            "test_output": test_phonemes
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }


@router.post("/tts-to-visemes", response_model=dict)
async def convert_tts_to_visemes(request: PhonemeRequest, req: Request = None):
    """
    Generate audio from text using edge-tts and return visemes + audio URL.
    
    Args:
        request: PhonemeRequest with text
        
    Returns:
        JSON with:
        - audio_url: URL to generated MP3
        - visemes: List of viseme frames
    """
    import os
    from app.services.tts_service import generate_speech, cleanup_old_files
    from app.services.phoneme_service import audio_to_visemes
    from fastapi import Request
    
    try:
        if not request.text or not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")

        # Cleanup old files occasionally
        cleanup_old_files()

        # Generate audio (mp3)
        # Assuming backend is running on localhost:8000 for now, or use request.base_url
        audio_path = await generate_speech(request.text)
        
        # Audio path is relative "generated_audio/uuid.mp3"
        # We need absolute path for processing
        abs_audio_path = os.path.abspath(audio_path)
        
        # Process audio to visemes
        visemes = audio_to_visemes(abs_audio_path)
        
        # Construct public URL
        # If behind proxy (ngrok etc) this might need adjustment, but for localhost it's fine
        base_url = str(req.base_url).rstrip('/')
        audio_url = f"{base_url}/{audio_path.replace(os.path.sep, '/')}"
        
        return {
            "audio_url": audio_url,
            "visemes": [VisemeFrame(**v) for v in visemes]
        }
        
    except Exception as e:
        print(f"❌ Error in tts-to-visemes: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process TTS: {str(e)}"
        )
