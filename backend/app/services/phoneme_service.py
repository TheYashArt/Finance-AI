
"""
Phoneme Service - Converts text to ARPABET phonemes and visemes using g2p_en library
Now with custom 39-phoneme shape key mappings for precise lip-sync control
"""
import os
import sys
import re
from typing import List, Dict, Optional
import tempfile
from g2p_en import G2p
from app.services.phoneme_shapes import get_shape_keys_for_phoneme

# Initialize G2P (English) model
# This model converts English text to ARPABET phonemes
try:
    g2p = G2p()
except Exception as e:
    print(f"⚠️ Failed to initialize g2p_en: {e}")
    g2p = None

# Allosaurus removed - audio upload feature deprecated


# ARPABET Durations (in seconds)
# Vowels generally last longer (~0.12s) than consonants (~0.08s)
ARPABET_DURATIONS = {
    # Vowels
    'AA': 0.12, 'AE': 0.12, 'AH': 0.12, 'AO': 0.12, 'AW': 0.12,
    'AY': 0.12, 'EH': 0.12, 'ER': 0.12, 'EY': 0.12, 'IH': 0.12,
    'IY': 0.12, 'OW': 0.12, 'OY': 0.12, 'UH': 0.12, 'UW': 0.12,
    # Consonants
    'B': 0.06, 'CH': 0.08, 'D': 0.06, 'DH': 0.06, 'F': 0.08,
    'G': 0.06, 'HH': 0.06, 'JH': 0.08, 'K': 0.06, 'L': 0.08,
    'M': 0.08, 'N': 0.06, 'NG': 0.08, 'P': 0.06, 'R': 0.08,
    'S': 0.08, 'SH': 0.08, 'T': 0.06, 'TH': 0.08, 'V': 0.06,
    'W': 0.08, 'Y': 0.06, 'Z': 0.08, 'ZH': 0.08,
    # Silence / Pause
    ' ': 0.05,
    ',': 0.2,
    '.': 0.4,
    '?': 0.4,
    '!': 0.4
}

def remove_stress(phone: str) -> str:
    """Remove stress numbers from ARPABET phonemes (e.g. AA1 -> AA)"""
    return re.sub(r'\d+', '', phone)

def text_to_phonemes(text: str, language: str = 'en-us') -> str:
    """
    Convert text to ARPABET phonemes string
    Args:
        text: Input text
    Returns:
        Space-separated ARPABET string
    """
    if not g2p:
        raise RuntimeError("g2p_en library not initialized")
    
    if not text or text.strip() == '':
        return ''
        
    try:
        # g2p returns a list of phonemes/symbols
        phonemes = g2p(text)
        
        # Clean and join
        # Keep spaces as separators if needed, but standardizing to space-separated string
        processed = []
        for p in phonemes:
            if p == ' ':
                continue
            processed.append(p)
            
        return ' '.join(processed)
    except Exception as e:
        print(f"❌ G2P error: {e}")
        raise RuntimeError(f"G2P conversion failed: {str(e)}")


def text_to_viseme_sequence(text: str, language: str = 'en-us') -> List[Dict]:
    """
    Convert text to a timed sequence of visemes with custom shape keys
    
    Args:
        text: Input text
        language: Language code (default: 'en-us')
    
    Returns:
        List of viseme frames with timing information and shape keys
        Each frame contains: viseme, start, duration, shape_keys
    """
    if not g2p:
        raise RuntimeError("g2p_en library not initialized")
        
    # Get phoneme list from g2p
    # Example: ['HH', 'AH0', 'L', 'OW1', ' ', 'W', 'ER1', 'L', 'D']
    raw_phonemes = g2p(text)
    
    viseme_sequence = []
    current_time = 0.0
    
    for phone in raw_phonemes:
        # Handle spaces/punctuation
        if phone == ' ':
            # Add small silence between words
            duration = 0.04
            shape_keys = get_shape_keys_for_phoneme('sil')
            viseme_sequence.append({
                'viseme': 'sil',
                'start': current_time,
                'duration': duration,
                'shape_keys': shape_keys
            })
            current_time += duration
            continue
            
        if phone in [',', '.', '?', '!']:
            # Punctuation pause
            duration = ARPABET_DURATIONS.get(phone, 0.2)
            shape_keys = get_shape_keys_for_phoneme('sil')
            viseme_sequence.append({
                'viseme': 'sil',
                'start': current_time,
                'duration': duration,
                'shape_keys': shape_keys
            })
            current_time += duration
            continue
            
        # Standard Phoneme
        # clear stress (AA1 -> AA)
        base_phone = remove_stress(phone)
        
        # Get duration
        duration = ARPABET_DURATIONS.get(base_phone, 0.08)
        
        # Get shape keys for this phoneme
        shape_keys = get_shape_keys_for_phoneme(base_phone)
        
        viseme_sequence.append({
            'viseme': base_phone,  # e.g. "AA", "EH"
            'start': current_time,
            'duration': duration,
            'shape_keys': shape_keys  # NEW: Custom shape key values
        })
        
        current_time += duration
        
    # Add final silence to ensure animation resets
    shape_keys = get_shape_keys_for_phoneme('sil')
    viseme_sequence.append({
        'viseme': 'sil',
        'start': current_time,
        'duration': 0.2,
        'shape_keys': shape_keys
    })
    
    return viseme_sequence



def estimate_duration(text: str, language: str = 'en-us') -> float:
    """Estimate total duration from text"""
    visemes = text_to_viseme_sequence(text)
    if not visemes:
        return 0.0
    last = visemes[-1]
    return last['start'] + last['duration']
