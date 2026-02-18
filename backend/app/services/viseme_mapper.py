"""
Viseme mapping and merging utilities - ARPABET based with phoneme grouping
"""

# Phoneme Groups - phonemes requiring the same mouth shape
PHONEME_GROUPS = {
    # g1: OPEN - Wide open mouth
    'g1_OPEN': ['AA', 'AH', 'AO', 'HH'],
    
    # g2: WIDE - Wide lips with open mouth
    'g2_WIDE': ['AE', 'EH', 'AY', 'EY', 'IH', 'IY', 'Y'],
    
    # g3: R - Open with slight round
    'g3_R': ['ER', 'R'],
    
    # g4: ROUND - Rounded and protruded lips
    'g4_ROUND': ['AW', 'OW', 'OY', 'UH', 'UW', 'W'],
    
    # g5: CLOSED - Lips closed
    'g5_CLOSED': ['B', 'M', 'P'],
    
    # g6: FV - Lip-teeth contact
    'g6_FV': ['F', 'V'],
    
    # g7: SIBILANT - Lips open, teeth/tongue closed
    'g7_SIBILANT': ['S', 'Z', 'SH', 'ZH', 'JH'],
    
    # g8: DENTAL - Tongue between teeth
    'g8_DENTAL': ['TH', 'DH'],
    
    # g9: ALVEOLAR - Tongue tip up
    'g9_ALVEOLAR': ['T', 'D', 'L', 'N'],
    
    # g10: BACK - Open fallback for back consonants
    'g10_BACK': ['K', 'NG', 'G'],
    
    # Silence (SPECIAL)
    'sil': ['SIL', 'SP', 'sil'],
}

# Reverse mapping: phoneme -> group
PHONEME_TO_GROUP = {}
for group_name, phonemes in PHONEME_GROUPS.items():
    for phoneme in phonemes:
        PHONEME_TO_GROUP[phoneme] = group_name

# Group to shape key mapping (for reference/documentation)
GROUP_SHAPES = {
    'g1_OPEN': 'TeethTongue_Open',
    'g2_WIDE': 'Lips_Wide + Lips_Open_Wide',
    'g3_R': 'OPEN + slight ROUND',
    'g4_ROUND': 'Lips_Round + Lips_Protude',
    'g5_CLOSED': 'Lips_Open: 0',
    'g6_FV': 'Lips_FV + TeethTongue_Bite',
    'g7_SIBILANT': 'Lips_open + TeethTongue_open: 0',
    'g8_DENTAL': 'TeethTongue_Bite',
    'g9_ALVEOLAR': 'Lips_open + TeethTongue_TipUp',
    'g10_BACK': 'OPEN fallback',
}

MIN_DURATION = 0.04  # 40ms minimum segment duration
ANTICIPATION_SHIFT = 0.04  # 40ms visual anticipation

def map_phoneme_to_group(phoneme: str) -> str:
    """Map ARPABET phoneme to its group"""
    # Remove stress markers (0, 1, 2)
    clean = phoneme.upper().replace('0', '').replace('1', '').replace('2', '')
    
    # Handle silence explicitly
    if clean in ['SIL', 'SP', '']:
        return 'sil'
        
    return PHONEME_TO_GROUP.get(clean, 'g1_OPEN')  # Default to OPEN

def group_and_merge_phonemes(phonemes: list, phoneme_durations: list = None) -> list:
    """
    Group phonemes by mouth shape and merge consecutive same-group phonemes
    
    Args:
        phonemes: List of ARPABET phoneme strings
        phoneme_durations: Optional list of durations (seconds). If None, uses default 0.08s
        
    Returns:
        List of grouped segments: [{'group': str, 'phonemes': list, 'start': float, 'end': float}, ...]
    """
    if not phonemes:
        return []
    
    # Default duration if not provided
    if phoneme_durations is None:
        phoneme_durations = [0.08] * len(phonemes)
    
    grouped = []
    current_time = 0.0
    
    for phoneme, duration in zip(phonemes, phoneme_durations):
        group = map_phoneme_to_group(phoneme)
        
        # If same group as previous, merge by extending end time
        if grouped and grouped[-1]['group'] == group:
            grouped[-1]['end'] = current_time + duration
            grouped[-1]['phonemes'].append(phoneme)
        else:
            # New group segment
            grouped.append({
                'group': group,
                'phonemes': [phoneme],
                'start': current_time,
                'end': current_time + duration
            })
        
        current_time += duration
    
    return grouped

def filter_short_segments(segments: list, min_duration: float = MIN_DURATION) -> list:
    """
    Remove segments shorter than minimum duration
    
    Args:
        segments: List of segments with 'start' and 'end' times
        min_duration: Minimum duration threshold in seconds
        
    Returns:
        Filtered list of segments
    """
    return [
        seg for seg in segments
        if (seg['end'] - seg['start']) >= min_duration
    ]

def apply_visual_anticipation(segments: list, shift: float = ANTICIPATION_SHIFT) -> list:
    """
    Apply visual anticipation by shifting start times earlier
    
    Args:
        segments: List of segments with 'start' times
        shift: Time shift in seconds (default 40ms)
        
    Returns:
        Segments with adjusted start times
    """
    for seg in segments:
        seg['start'] = max(0.0, seg['start'] - shift)
    return segments

def compress_timeline(segments: list, scale: float = 0.92) -> list:
    """
    Compress timeline by scaling all timing values
    
    Args:
        segments: List of segments with 'start' and 'end' times
        scale: Timing compression scale (0.92 = 8% faster, 1.0 = no change)
        
    Returns:
        Segments with compressed timing
    """
    for seg in segments:
        seg['start'] *= scale
        seg['end'] *= scale
    return segments

def phonemes_to_grouped_timeline(phonemes: list, phoneme_durations: list = None) -> list:
    """
    Convert ARPABET phoneme list to grouped timeline with merging
    
    This is the main function that implements the phoneme grouping strategy:
    1. Group phonemes by mouth shape
    2. Merge consecutive same-group phonemes
    3. Filter out very short segments
    4. Apply visual anticipation
    5. Compress timeline for better sync
    
    Args:
        phonemes: List of ARPABET phoneme strings
        phoneme_durations: Optional list of durations (seconds). If None, uses default 0.08s
        
    Returns:
        List of grouped segments: [{'group': str, 'phonemes': list, 'start': float, 'end': float}, ...]
    """
    if not phonemes:
        return []
    
    # Step 1: Group and merge consecutive same-group phonemes
    grouped = group_and_merge_phonemes(phonemes, phoneme_durations)
    
    # Step 2: Filter out very short segments
    filtered = filter_short_segments(grouped, MIN_DURATION)
    
    # Step 3: Apply visual anticipation (optional)
    # if apply_anticipation:
    #     filtered = apply_visual_anticipation(filtered, ANTICIPATION_SHIFT)
    
    # Step 4: Compress timing for better sync
    filtered = compress_timeline(filtered, scale=0.92)
    
    return filtered

# Legacy function for backward compatibility
def phonemes_to_viseme_timeline(phonemes: list, phoneme_durations: list = None) -> list:
    """
    Legacy function - now uses grouped timeline approach
    
    Returns viseme-style format for compatibility: [{'viseme': str, 'start': float, 'end': float}, ...]
    """
    grouped = phonemes_to_grouped_timeline(phonemes, phoneme_durations, apply_anticipation)
    
    # Convert group format to viseme format (use group name as viseme)
    return [
        {
            'viseme': seg['group'],
            'start': seg['start'],
            'end': seg['end']
        }
        for seg in grouped
    ]

