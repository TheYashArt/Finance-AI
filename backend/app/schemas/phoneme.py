from pydantic import BaseModel
from typing import List


class PhonemeRequest(BaseModel):
    """Request model for text-to-phoneme conversion"""
    text: str
    language: str = 'en-us'


class VisemeFrame(BaseModel):
    """Single viseme frame with timing information"""
    viseme: str
    start: float
    duration: float


class PhonemeResponse(BaseModel):
    """Response model containing phonemes and viseme sequence"""
    text: str
    phonemes: str  # IPA representation
    visemes: List[VisemeFrame]
    total_duration: float
