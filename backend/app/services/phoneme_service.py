"""
Phoneme Service - Converts text to phonemes and visemes using Phonemizer library
"""
import os
import sys

# Configure eSpeak-ng library path for Windows
# This allows Phonemizer to find eSpeak-ng without requiring terminal restart
if sys.platform == 'win32':
    # Common installation paths for eSpeak-ng on Windows
    espeak_paths = [
        r"C:\Program Files\eSpeak NG",
        r"C:\Program Files (x86)\eSpeak NG",
    ]
    
    for path in espeak_paths:
        if os.path.exists(path):
            # Add to PATH if not already there
            if path not in os.environ.get('PATH', ''):
                os.environ['PATH'] = path + os.pathsep + os.environ.get('PATH', '')
            
            # Set PHONEMIZER_ESPEAK_LIBRARY environment variable
            # This tells phonemizer exactly where to find the espeak-ng DLL
            dll_path = os.path.join(path, 'libespeak-ng.dll')
            if os.path.exists(dll_path):
                os.environ['PHONEMIZER_ESPEAK_LIBRARY'] = dll_path
                print(f"✅ Found eSpeak-ng at: {path}")
                print(f"✅ Set PHONEMIZER_ESPEAK_LIBRARY to: {dll_path}")
                break
    else:
        print("⚠️ eSpeak-ng not found in common installation paths")

# Configure FFmpeg library path for Pydub (Windows)
# This allows Pydub to find FFmpeg without requiring terminal restart/PATH update
if sys.platform == 'win32':
    # Common installation paths for FFmpeg on Windows via Winget/Chocolatey
    ffmpeg_paths = [
        r"C:\Program Files\ffmpeg\bin",
        r"C:\ffmpeg\bin",
        # Winget default location
        os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin"),
    ]
    
    ffmpeg_found = False
    for path in ffmpeg_paths:
        if os.path.exists(path):
            # Check for ffmpeg.exe
            if os.path.exists(os.path.join(path, 'ffmpeg.exe')):
                # Add to PATH if not already there
                if path not in os.environ.get('PATH', ''):
                    os.environ['PATH'] = path + os.pathsep + os.environ.get('PATH', '')
                    print(f"✅ Found and added FFmpeg to PATH: {path}")
                else:
                     print(f"✅ FFmpeg found in PATH: {path}")
                ffmpeg_found = True
                break
    
    if not ffmpeg_found:
        print("⚠️ FFmpeg not found in common locations. Pydub depends on it.")

from phonemizer import phonemize
from phonemizer.backend import EspeakBackend
from phonemizer.separator import Separator
import re
from typing import List, Dict, Optional
import tempfile
try:
    from allosaurus.app import read_recognizer
    ALLOSAURUS_AVAILABLE = True
except ImportError:
    ALLOSAURUS_AVAILABLE = False



# Oculus/Meta Viseme Standard - 15 viseme shapes
VISEME_TYPES = {
    'sil', 'PP', 'FF', 'TH', 'DD', 'kk', 'CH', 'SS', 'nn', 'RR', 'aa', 'E', 'I', 'O', 'U'
}


# IPA to Viseme mapping
# Maps International Phonetic Alphabet symbols to Oculus viseme types
IPA_TO_VISEME = {
    # Silence
    ' ': 'sil',
    '': 'sil',
    
    # Bilabial stops (lips together) - PP
    'p': 'PP', 'b': 'PP', 'm': 'PP',
    
    # Labiodental fricatives (lip to teeth) - FF
    'f': 'FF', 'v': 'FF',
    
    # Dental fricatives (tongue between teeth) - TH
    'θ': 'TH', 'ð': 'TH',
    
    # Alveolar stops (tongue to ridge) - DD
    't': 'DD', 'd': 'DD',
    
    # Velar stops (back of tongue) - kk
    'k': 'kk', 'g': 'kk', 'ŋ': 'kk',
    
    # Postalveolar affricates/fricatives - CH
    'tʃ': 'CH', 'dʒ': 'CH', 'ʃ': 'CH', 'ʒ': 'CH',
    
    # Alveolar fricatives - SS
    's': 'SS', 'z': 'SS',
    
    # Alveolar nasals/laterals - nn
    'n': 'nn', 'l': 'nn',
    
    # Rhotic sounds - RR
    'r': 'RR', 'ɹ': 'RR', 'ɚ': 'RR', 'ɝ': 'RR',
    
    # Approximants
    'w': 'U', 'j': 'I', 'h': 'sil',
    
    # Vowels - aa (open back)
    'ɑ': 'aa', 'ɑː': 'aa', 'a': 'aa', 'aː': 'aa',
    
    # Vowels - E (mid front)
    'e': 'E', 'eː': 'E', 'ɛ': 'E', 'æ': 'E',
    
    # Vowels - I (close front)
    'i': 'I', 'iː': 'I', 'ɪ': 'I',
    
    # Vowels - O (mid/close back rounded)
    'o': 'O', 'oː': 'O', 'ɔ': 'O', 'ɔː': 'O', 'ɒ': 'O',
    
    # Vowels - U (close back rounded)
    'u': 'U', 'uː': 'U', 'ʊ': 'U', 'ʌ': 'U', 'ə': 'U', 'əː': 'U',
    
    # Diphthongs - map to primary vowel
    'aɪ': 'E',  # "eye"
    'aʊ': 'O',  # "out"
    'eɪ': 'E',  # "day"
    'oʊ': 'O',  # "go"
    'ɔɪ': 'O',  # "boy"
}


def text_to_phonemes(text: str, language: str = 'en-us') -> str:
    """
    Convert text to IPA phonemes using Phonemizer
    
    Args:
        text: Input text to convert
        language: Language code (default: 'en-us')
    
    Returns:
        IPA phoneme string
    
    Raises:
        RuntimeError: If eSpeak-ng is not installed or phonemizer fails
    """
    if not text or text.strip() == '':
        return ''
    
    try:
        # Use espeak backend for phonemization
        separator = Separator(phone=' ', word=' | ', syllable='')
        
        phonemes = phonemize(
            text,
            language=language,
            backend='espeak',
            separator=separator,
            strip=True,
            preserve_punctuation=True,
            with_stress=False
        )
        
        # If phonemes is empty, eSpeak-ng likely failed
        if not phonemes or phonemes.strip() == '':
            raise RuntimeError("Phonemizer returned empty result - eSpeak-ng may not be installed")
        
        return phonemes
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Phonemizer error: {error_msg}")
        
        # Provide helpful error message
        if 'espeak' in error_msg.lower() or 'not found' in error_msg.lower():
            raise RuntimeError(
                "eSpeak-ng is not installed or not accessible. "
                "Please install eSpeak-ng from https://github.com/espeak-ng/espeak-ng/releases "
                "and add it to your system PATH. See ESPEAK_INSTALLATION.md for details."
            )
        else:
            raise RuntimeError(f"Phonemizer failed: {error_msg}")


def ipa_to_viseme(ipa_symbol: str) -> str:
    """
    Map a single IPA symbol to a viseme type
    
    Args:
        ipa_symbol: IPA phoneme symbol
    
    Returns:
        Viseme type (one of the 15 Oculus visemes)
    """
    # Remove stress markers and length markers
    cleaned = ipa_symbol.replace('ˈ', '').replace('ˌ', '').replace('ː', '')
    
    # Try exact match first
    if cleaned in IPA_TO_VISEME:
        return IPA_TO_VISEME[cleaned]
    
    # Try without length marker
    base = cleaned.rstrip('ː')
    if base in IPA_TO_VISEME:
        return IPA_TO_VISEME[base]
    
    # Default to silence for unknown symbols
    return 'sil'


def get_viseme_duration(viseme: str) -> float:
    """
    Estimate duration for a viseme in seconds
    
    Args:
        viseme: Viseme type
    
    Returns:
        Duration in seconds
    """
    # Consonants are typically shorter than vowels
    consonants = ['PP', 'FF', 'TH', 'DD', 'kk', 'CH', 'SS', 'nn', 'RR']
    vowels = ['aa', 'E', 'I', 'O', 'U']
    
    if viseme in consonants:
        return 0.2  # 60ms for consonants - much faster to match audio at 0.85 rate
    elif viseme in vowels:
        return 0.1  # 90ms for vowels - faster to match audio
    else:
        return 0.08  # 40ms for silence - very quick pauses



def text_to_viseme_sequence(text: str, language: str = 'en-us') -> List[Dict]:
    """
    Convert text to a timed sequence of visemes with punctuation-aware pauses
    
    Args:
        text: Input text
        language: Language code
    
    Returns:
        List of viseme frames with timing information
    """
    # Split text into words to track punctuation
    text_words = text.split()
    
    # Get IPA phonemes
    phonemes = text_to_phonemes(text, language)
    
    if not phonemes:
        return [{'viseme': 'sil', 'start': 0, 'duration': 0.5}]
    
    # Split into words (separated by |)
    words = phonemes.split('|')
    
    viseme_sequence = []
    current_time = 0.0
    
    for word_idx, word in enumerate(words):
        # Split word into individual phonemes
        phones = word.strip().split()
        
        for phone in phones:
            if not phone or phone.isspace():
                continue
            
            # CHECK FOR PUNCTUATION
            # With preserve_punctuation=True, puctuation marks appear in the phoneme stream
            if phone in ',.;:!?':
                pause_duration = get_punctuation_pause(phone)
                viseme_sequence.append({
                    'viseme': 'sil',
                    'start': current_time,
                    'duration': pause_duration
                })
                current_time += pause_duration
                continue

            # Convert IPA to viseme
            viseme = ipa_to_viseme(phone)
            duration = get_viseme_duration(viseme)
            
            viseme_sequence.append({
                'viseme': viseme,
                'start': current_time,
                'duration': duration
            })
            
            current_time += duration
        
        # Add small pause between words if not already paused by punctuation
        # (This is now less critical but good for non-punctuated spacing)
        if word_idx < len(words) - 1:
             viseme_sequence.append({
                'viseme': 'sil',
                'start': current_time,
                'duration': 0.04  # Small gap between words
            })
             current_time += 0.04
    
    # Add final silence
    viseme_sequence.append({
        'viseme': 'sil',
        'start': current_time,
        'duration': 0.3
    })
    
    # ============================================
    # MERGE VISEMES FOR SMOOTHER ANIMATION
    # ============================================
    # Reduce rapid mouth movements by merging similar consecutive visemes
    merged_sequence = merge_visemes(viseme_sequence)
    
    return merged_sequence


def merge_visemes(viseme_sequence: List[Dict]) -> List[Dict]:
    """
    Merge consecutive similar visemes to reduce rapid mouth movements
    
    Args:
        viseme_sequence: Original viseme sequence
    
    Returns:
        Merged viseme sequence with fewer, longer visemes
    """
    if not viseme_sequence:
        return viseme_sequence
    
    # Define visual groups - visemes in the same group look similar
    VISUAL_GROUPS = {
        'aa': 'open', 'O': 'round', 'U': 'round',  # Big shapes
        'E': 'wide', 'I': 'wide', 'SS': 'wide',    # Wide/Smile shapes
        'RR': 'pucker', 'CH': 'pucker', 'PP': 'closed', # Pucker/Closed
        'FF': 'neutral', 'TH': 'neutral', 'DD': 'neutral', 'kk': 'neutral', 'nn': 'neutral', # Subtle
        'sil': 'sil'
    }
    
    merged = []
    i = 0
    
    while i < len(viseme_sequence):
        current = viseme_sequence[i]
        
        # Start with current viseme
        merged_viseme = current['viseme']
        merged_start = current['start']
        merged_duration = current['duration']
        current_group = VISUAL_GROUPS.get(merged_viseme, 'neutral')
        
        # Look ahead to merge similar visemes
        j = i + 1
        while j < len(viseme_sequence):
            next_viseme = viseme_sequence[j]
            next_group = VISUAL_GROUPS.get(next_viseme['viseme'], 'neutral')
            
            # Merge if:
            # 1. Exact same viseme
            # 2. Same visual group (e.g. both are 'wide' or 'neutral')
            # 3. Both are silence
            if (next_viseme['viseme'] == merged_viseme or
                (merged_viseme == 'sil' and next_viseme['viseme'] == 'sil') or
                (current_group == next_group and current_group != 'open')): # Don't merge distinct open shapes too aggressively
                
                # Biasing: When merging different visemes in same group, keep the "stronger" one?
                # For simplicity, keep the first one but extend duration
                merged_duration += next_viseme['duration']
                j += 1
            else:
                break
        
        # Add merged viseme
        merged.append({
            'viseme': merged_viseme,
            'start': merged_start,
            'duration': merged_duration
        })
        
        # Skip to next unmerged viseme
        i = j
    
    # Intelligent Filtering:
    # 1. Keep 'sil' (pauses are important for rhythm)
    # 2. Keep 'strong' shapes if they are at least 0.04s (aa, O, E, I, PP)
    # 3. Filter 'weak' shapes if they are less than 0.08s (neutral group)
    
    STRONG_SHAPES = ['aa', 'O', 'E', 'I', 'PP', 'U']
    
    final_sequence = []
    for viseme in merged:
        v_type = viseme['viseme']
        duration = viseme['duration']
        
        keep = False
        
        if v_type == 'sil':
            # Always keep silence if it's meaningful (> 0.03s)
            if duration > 0.03: keep = True
        elif v_type in STRONG_SHAPES:
            # Keep strong shapes if they are visible (> 0.04s)
            if duration >= 0.04: keep = True
        else:
            # Weak shapes (neutral) need to be longer to be worth showing (> 0.08s)
            if duration >= 0.08: keep = True
            
        if keep:
            final_sequence.append(viseme)
        else:
            # If we drop a viseme, we should probably add its duration to the previous one
            # to maintain total time, or just let the gaps be filled by interpolation
            # Adding to previous is safer to avoid gaps
            if final_sequence:
                final_sequence[-1]['duration'] += duration
            # If it's the first one, maybe add to next? (Handled by start time recalc)
    
    # Recalculate start times ensuring continuous flow
    current_time = 0.0
    for viseme in final_sequence:
        viseme['start'] = current_time
        current_time += viseme['duration']
    
    return final_sequence


def get_punctuation_pause(punct: str) -> float:
    """
    Get pause duration for punctuation marks
    
    Args:
        punct: Punctuation character
    
    Returns:
        Pause duration in seconds
    """
    punctuation_pauses = {
        ',': 0.8,    # Short pause for comma
        ';': 0.5,    # Medium pause for semicolon
        ':': 0.5,    # Medium pause for colon
        '.': 0.6,    # Long pause for period
        '!': 0.6,    # Long pause for exclamation
        '?': 0.6,    # Long pause for question
    }
    
    return punctuation_pauses.get(punct, 0.1)  # Default small pause for others


def estimate_duration(text: str, language: str = 'en-us') -> float:
    """
    Estimate total speech duration for text
    
    Args:
        text: Input text
        language: Language code
    
    Returns:
        Total duration in seconds
    """
    visemes = text_to_viseme_sequence(text, language)
    if not visemes:
        return 0.0
    
    return last_viseme['start'] + last_viseme['duration']


# Global recognizer instance (lazy loaded)
_recognizer = None

def get_recognizer():
    """Lazily load the Allosaurus recognizer"""
    global _recognizer
    if _recognizer is None and ALLOSAURUS_AVAILABLE:
        print("⏳ Loading Allosaurus model (this may take a moment)...")
        try:
            _recognizer = read_recognizer()
            print("✅ Allosaurus model loaded")
        except Exception as e:
            print(f"❌ Failed to load Allosaurus model: {e}")
            raise RuntimeError(f"Failed to load Allosaurus: {e}")
    return _recognizer


def audio_to_visemes(audio_path: str) -> List[Dict]:
    """
    Convert audio file to viseme sequence using Allosaurus for precise timing
    
    Args:
        audio_path: Path to audio file (wav/mp3)
    
    Returns:
        List of viseme frames with precise timing
    """
    if not ALLOSAURUS_AVAILABLE:
        raise RuntimeError("Allosaurus not installed. Cannot process audio.")
        
    recognizer = get_recognizer()
    if not recognizer:
        raise RuntimeError("Could not initialize Allosaurus recognizer")
        
    try:
        # Convert to WAV if needed (Allosaurus supports only WAV)
        processing_path = audio_path
        if not audio_path.lower().endswith('.wav'):
            processing_path = audio_path + ".wav"
            try:
                from pydub import AudioSegment
                sound = AudioSegment.from_file(audio_path)
                sound = sound.set_frame_rate(16000).set_channels(1) # Optimize for recognition
                sound.export(processing_path, format="wav")
                print(f"🎵 Converted {audio_path} to WAV for processing")
            except ImportError as ie:
                print(f"⚠️ Pydub import failed: {ie}")
                print("⚠️ Attempting to process raw file (might fail if not wav)")
                processing_path = audio_path
            except Exception as conv_err:
                print(f"❌ Conversion failed: {conv_err}")
                raise RuntimeError(f"Failed to convert audio file: {conv_err}")

        # Allosaurus recognize with timestamp=True returns:
        # "start duration phone" (newlines separated)
        result = recognizer.recognize(processing_path, timestamp=True)
        
        # Cleanup temporary wav file if it was created
        if processing_path != audio_path and os.path.exists(processing_path):
            try:
                os.remove(processing_path)
            except:
                pass
        
        viseme_sequence = []
        
        # Parse output lines
        raw_sequence = []
        for line in result.strip().split('\n'):
            if not line.strip():
                continue
            parts = line.strip().split()
            if len(parts) < 3:
                continue
            
            raw_sequence.append({
                'start': float(parts[0]),
                'duration': float(parts[1]),
                'phone': parts[2]
            })

        # Process sequence and Fill Gaps with Silence
        viseme_sequence = []
        current_time = 0.0
        
        for item in raw_sequence:
            # Check for gap before this phone
            gap = item['start'] - current_time
            if gap > 0.01: # Tolerance of 10ms
                viseme_sequence.append({
                    'viseme': 'sil',
                    'start': current_time,
                    'duration': gap
                })
            
            # Add current phone
            viseme = ipa_to_viseme(item['phone'])
            viseme_sequence.append({
                'viseme': viseme,
                'start': item['start'],
                'duration': item['duration'],
                'original_phone': item['phone']
            })
            
            current_time = item['start'] + item['duration']
            
        # Merge visemes for smoothing (merge_visemes handles recalculating start/durations)
        # Since we filled gaps with 'sil', merge_visemes will preserve total duration
        merged = merge_visemes(viseme_sequence)
        
        return merged
        
    except Exception as e:
        print(f"❌ Error in audio_to_visemes: {e}")
        raise RuntimeError(f"Audio processing failed: {str(e)}")

