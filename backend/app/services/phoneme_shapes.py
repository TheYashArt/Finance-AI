"""
ARPABET to Shape Key Mapping
Based on research from Phonemes-Visemes-research.md (lines 238-278)
39 ARPABET phonemes mapped to lips, teeth, and tongue shape keys

This module provides precise shape key values for each ARPABET phoneme
to drive realistic lip-sync animation on 3D avatars.
"""

# Complete mapping of 39 ARPABET phonemes to shape keys
# Each phoneme has specific values for lips and teeth/tongue controls
PHONEME_SHAPE_KEYS = {
    # Vowels
    'AA': {
        'lips': {'Lips_Open_Wide': 0.8, 'Lips_Wide': 0.5},
        'teeth': {'TeethTongue_Open': 1.0}
    },
    'AE': {
        'lips': {'Lips_Wide': 0.7, 'Lips_Open_Wide': 0.7},
        'teeth': {'TeethTongue_Bite': 0.3}
    },
    'AH': {
        'lips': {'Lips_Open_Wide': 0.5, 'Lips_Round': 0.2},
        'teeth': {'TeethTongue_Open': 0.8}
    },
    'AO': {
        'lips': {'Lips_Round': 0.7, 'Lips_Protude': 0.6},
        'teeth': {'TeethTongue_Open': 0.6}
    },
    'AW': {
        'lips': {'Lips_Round': 0.8, 'Lips_Open_Wide': 0.6},
        'teeth': {'TeethTongue_Open': 0.7}
    },
    'AY': {
        'lips': {'Lips_Wide': 0.6, 'Lips_Corner_Up': 0.3},
        'teeth': {'TeethTongue_Open': 0.5}
    },
    'EH': {
        'lips': {'Lips_Wide': 0.7, 'Lips_Open_Wide': 0.6},
        'teeth': {'TeethTongue_Bite': 0.3}
    },
    'ER': {
        'lips': {'Lips_Round': 0.4, 'Lips_Open_Wide': 0.5},
        'teeth': {'TeethTongue_Open': 0.9}
    },
    'EY': {
        'lips': {'Lips_Wide': 0.8, 'Lips_Corner_Up': 0.4},
        'teeth': {'TeethTongue_Open': 0.4}
    },
    'IH': {
        'lips': {'Lips_Wide': 0.9, 'Lips_Corner_Up': 0.3},
        'teeth': {'TeethTongue_Open': 0.5}
    },
    'IY': {
        'lips': {'Lips_Wide': 1.0, 'Lips_Corner_Up': 0.5},
        'teeth': {'TeethTongue_Open': 0.4}
    },
    'OW': {
        'lips': {'Lips_Round': 0.9, 'Lips_Purse_Narrow': 0.6},
        'teeth': {'TeethTongue_Open': 0.3}
    },
    'OY': {
        'lips': {'Lips_Round': 0.7, 'Lips_Protude': 0.5, 'Lips_Wide': 0.3},
        'teeth': {'TeethTongue_Open': 0.5}
    },
    'UH': {
        'lips': {'Lips_Round': 0.8, 'Lips_Purse_Narrow': 0.7},
        'teeth': {'TeethTongue_Open': 0.2}
    },
    'UW': {
        'lips': {'Lips_Round': 1.0, 'Lips_Purse_Narrow': 0.9},
        'teeth': {'TeethTongue_Open': 0.1}
    },
    
    # Consonants
    'B': {
        'lips': {'Lips_Protude': 0.9, 'Lips_FV': 0.1},
        'teeth': {'TeethTongue_Open': 0.0}
    },
    'CH': {
        'lips': {'Lips_Wide': 0.5, 'Lips_Open_Wide': 0.4},
        'teeth': {'TeethTongue_TipUp': 0.8, 'TeethTongue_Bite': 0.5}
    },
    'D': {
        'lips': {'Lips_Wide': 0.4, 'Lips_Open_Wide': 0.3},
        'teeth': {'TeethTongue_TipUp': 0.7, 'TeethTongue_Bite': 0.4}
    },
    'DH': {
        'lips': {'Lips_Wide': 0.5, 'Lips_Corner_Up': 0.2},
        'teeth': {'TeethTongue_TipUp': 1.0}
    },
    'F': {
        'lips': {'Lips_FV': 1.0, 'Lips_Protude': 0.5},
        'teeth': {'TeethTongue_Open': 0.3}
    },
    'G': {
        'lips': {'Lips_Round': 0.3, 'Lips_Open_Wide': 0.6},
        'teeth': {'TeethTongue_Open': 0.8}
    },
    'HH': {
        'lips': {'Lips_Open_Wide': 0.3, 'Lips_Wide': 0.4},
        'teeth': {'TeethTongue_Open': 0.7}
    },
    'JH': {
        'lips': {'Lips_Wide': 0.5, 'Lips_Open_Wide': 0.4},
        'teeth': {'TeethTongue_TipUp': 0.8, 'TeethTongue_Bite': 0.5}
    },
    'K': {
        'lips': {'Lips_Round': 0.3, 'Lips_Open_Wide': 0.7},
        'teeth': {'TeethTongue_Open': 0.9}
    },
    'L': {
        'lips': {'Lips_Wide': 0.4, 'Lips_Open_Wide': 0.3},
        'teeth': {'TeethTongue_TipUp': 0.6, 'TeethTongue_Bite': 0.3}
    },
    'M': {
        'lips': {'Lips_Protude': 0.8, 'Lips_FV': 0.2},
        'teeth': {'TeethTongue_Open': 0.0}
    },
    'N': {
        'lips': {'Lips_Wide': 0.4, 'Lips_Open_Wide': 0.3},
        'teeth': {'TeethTongue_TipUp': 0.7}
    },
    'NG': {
        'lips': {'Lips_Round': 0.4, 'Lips_Open_Wide': 0.5},
        'teeth': {'TeethTongue_Open': 0.8}
    },
    'P': {
        'lips': {'Lips_Protude': 0.9, 'Lips_FV': 0.1},
        'teeth': {'TeethTongue_Open': 0.0}
    },
    'R': {
        'lips': {'Lips_Round': 0.3, 'Lips_Open_Wide': 0.5},
        'teeth': {'TeethTongue_Open': 0.9}
    },
    'S': {
        'lips': {'Lips_Wide': 1.0, 'Lips_Open_Wide': 0.5},
        'teeth': {'TeethTongue_TipUp': 0.7}
    },
    'SH': {
        'lips': {'Lips_Wide': 0.9, 'Lips_Open_Wide': 0.5},
        'teeth': {'TeethTongue_TipUp': 0.6}
    },
    'T': {
        'lips': {'Lips_Wide': 0.4, 'Lips_Open_Wide': 0.3},
        'teeth': {'TeethTongue_TipUp': 0.8, 'TeethTongue_Bite': 0.5}
    },
    'TH': {
        'lips': {'Lips_Wide': 0.5, 'Lips_Corner_Up': 0.2},
        'teeth': {'TeethTongue_TipUp': 1.0}
    },
    'V': {
        'lips': {'Lips_FV': 1.0, 'Lips_Protude': 0.5},
        'teeth': {'TeethTongue_Open': 0.3}
    },
    'W': {
        'lips': {'Lips_Round': 0.9, 'Lips_Protude': 0.7},
        'teeth': {'TeethTongue_Open': 0.2}
    },
    'Y': {
        'lips': {'Lips_Wide': 0.6, 'Lips_Corner_Up': 0.4},
        'teeth': {'TeethTongue_Open': 0.5}
    },
    'Z': {
        'lips': {'Lips_Wide': 0.9, 'Lips_Open_Wide': 0.5},
        'teeth': {'TeethTongue_TipUp': 0.6}
    },
    'ZH': {
        'lips': {'Lips_Wide': 0.8, 'Lips_Open_Wide': 0.5},
        'teeth': {'TeethTongue_TipUp': 0.6}
    },
    
    # Silence
    'sil': {
        'lips': {'Lips_Neutral': 1.0},
        'teeth': {'TeethTongue_Neutral': 1.0}
    }
}


# IPA to ARPABET mapping from research doc (lines 180-222)
# Used for converting IPA phonemes (from audio processing) to ARPABET
IPA_TO_ARPABET = {
    'ɑ': 'AA',
    'æ': 'AE',
    'ʌ': 'AH',
    'ɔ': 'AO',
    'aʊ': 'AW',
    'aɪ': 'AY',
    'ɛ': 'EH',
    'ɝ': 'ER',
    'eɪ': 'EY',
    'ɪ': 'IH',
    'i': 'IY',
    'oʊ': 'OW',
    'ɔɪ': 'OY',
    'ʊ': 'UH',
    'u': 'UW',
    'b': 'B',
    'tʃ': 'CH',
    'd': 'D',
    'ð': 'DH',
    'f': 'F',
    'ɡ': 'G',
    'h': 'HH',
    'dʒ': 'JH',
    'k': 'K',
    'l': 'L',
    'm': 'M',
    'n': 'N',
    'ŋ': 'NG',
    'p': 'P',
    'ɹ': 'R',
    's': 'S',
    'ʃ': 'SH',
    't': 'T',
    'θ': 'TH',
    'v': 'V',
    'w': 'W',
    'j': 'Y',
    'z': 'Z',
    'ʒ': 'ZH'
}


def get_shape_keys_for_phoneme(arpabet: str) -> dict:
    """
    Get shape key values for a given ARPABET phoneme
    
    Args:
        arpabet: ARPABET phoneme (e.g., 'AA', 'B', 'CH')
                Can include stress markers (e.g., 'AA0', 'AA1') - they will be stripped
    
    Returns:
        Dictionary with 'lips' and 'teeth' shape key values
        Example: {'lips': {'Lips_Open_Wide': 0.8}, 'teeth': {'TeethTongue_Open': 1.0}}
    """
    # Remove stress markers (0, 1, 2) if present
    import re
    clean_phoneme = re.sub(r'\d+', '', arpabet)
    
    # Return shape keys or neutral default
    return PHONEME_SHAPE_KEYS.get(clean_phoneme, {
        'lips': {'Lips_Neutral': 1.0},
        'teeth': {'TeethTongue_Neutral': 1.0}
    })


def ipa_to_arpabet(ipa: str) -> str:
    """
    Convert IPA phoneme to ARPABET
    
    Args:
        ipa: IPA phoneme symbol
    
    Returns:
        ARPABET phoneme string, or 'sil' if not found
    """
    # Clean up IPA (remove length markers, stress markers)
    cleaned = ipa.replace('ː', '').replace('ˈ', '').replace('ˌ', '')
    return IPA_TO_ARPABET.get(cleaned, 'sil')
