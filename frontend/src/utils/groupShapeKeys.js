/**
 * Group-based shape key mappings for phoneme groups
 * Each group represents phonemes requiring the same mouth shape
 * This improves lip sync timing by sustaining shapes across similar phonemes
 */

const ZERO = {
    Lips_Open_Wide: 0, Lips_Wide: 0, Lips_Round: 0, Lips_Protude: 0,
    Lips_Purse_Narrow: 0, Lips_FV: 0, Lips_Corner_Up: 0,
    TeethTongue_Open: 0, TeethTongue_TipUp: 0, TeethTongue_Bite: 0
};

/**
 * Group to Shape Key Mapping
 * Based on phoneme grouping strategy for improved lip sync blending
 */
export const GROUP_TO_SHAPE_KEYS = {
    // g1: OPEN - Wide open mouth (AA, AH, AO, HH)
    'g1_OPEN': {
        TeethTongue_Open: 0.9,
        Lips_Open_Wide: 0.8,
        Lips_Round: 0.2,
        Lips_Wide: 0.1
    },

    // g2: WIDE - Wide lips with open mouth (AE, EH, AY, EY, IH, IY, Y)
    'g2_WIDE': {
        Lips_Wide: 0.9,
        Lips_Open_Wide: 0.5,
        Lips_Corner_Up: 0.3,
        TeethTongue_Open: 0.4
    },

    // g3: R - Open with slight round (ER, R)
    'g3_R': {
        Lips_Round: 0.5,
        Lips_Protude: 0.4,
        Lips_Open_Wide: 0.4,
        TeethTongue_Open: 0.5
    },

    // g4: ROUND - Rounded and protruded lips (AW, OW, OY, UH, UW, W)
    'g4_ROUND': {
        Lips_Round: 0.8,
        Lips_Protude: 0.7,
        Lips_Purse_Narrow: 0.4,
        Lips_Open_Wide: 0.3,
        TeethTongue_Open: 0.2
    },

    // g5: CLOSED - Lips closed (B, M, P)
    'g5_CLOSED': {
        Lips_Open_Wide: 0,
        Lips_Purse_Narrow: 0.2,
        Lips_Protude: 0.1,
        TeethTongue_Open: 0
    },

    // g6: FV - Lip-teeth contact (F, V)
    'g6_FV': {
        Lips_FV: 1.0,
        TeethTongue_Bite: 0.6,
        Lips_Open_Wide: 0.1,
        TeethTongue_Open: 0.1
    },

    // g7: SIBILANT - Lips open, teeth/tongue closed (S, Z, SH, ZH, JH)
    'g7_SIBILANT': {
        Lips_Open_Wide: 0.2,
        Lips_Wide: 0.6,
        TeethTongue_Open: 0,
        TeethTongue_TipUp: 0.4
    },

    // g8: DENTAL - Tongue between teeth (TH, DH)
    'g8_DENTAL': {
        TeethTongue_Bite: 0.9,
        Lips_Open_Wide: 0.2,
        Lips_Wide: 0.3,
        TeethTongue_Open: 0.2
    },

    // g9: ALVEOLAR - Tongue tip up (T, D, L, N)
    'g9_ALVEOLAR': {
        Lips_Open_Wide: 0.3,
        TeethTongue_TipUp: 0.9,
        TeethTongue_Open: 0.3,
        Lips_Wide: 0.2
    },

    // g10: BACK - Open fallback for back consonants (K, NG, G)
    'g10_BACK': {
        Lips_Open_Wide: 0.5,
        TeethTongue_Open: 0.6,
        Lips_Round: 0.1
    },

    // Silence/pause
    'sil': ZERO,
    'sp': ZERO,
};

/**
 * Get shape keys for a phoneme group
 * @param {string} group - Group identifier (e.g., 'g1_OPEN', 'g2_WIDE')
 * @returns {Object|null} Shape key values or null if unknown
 */
export function getGroupShapeKeys(group) {
    if (!group || typeof group !== 'string') return null;
    return GROUP_TO_SHAPE_KEYS[group] || null;
}

/**
 * All shape keys used in the system
 */
export const ALL_SHAPE_KEYS = [
    'Lips_Open_Wide', 'Lips_Wide', 'Lips_Round', 'Lips_Protude',
    'Lips_Purse_Narrow', 'Lips_FV', 'Lips_Corner_Up',
    'TeethTongue_Open', 'TeethTongue_TipUp', 'TeethTongue_Bite'
];
