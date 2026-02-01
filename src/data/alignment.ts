import type { PlayerMotivation, AlignmentCategory } from '../types';

type AlignmentMap = Record<PlayerMotivation, Record<string, number>>;

const alignmentScores: AlignmentMap = {
    HELP_PEOPLE: {
        '2A': -1, '2B': +1,
        '4A': -1, '4B': +1,
        '5A': -1, '5B': +1,
        '6A': +1, '6B': -1,
        '8A': +1, '8C': -1,
    },
    PROVE_MYSELF: {
        '2A': +1,
        '3A': +1,
        '4A': +1, '4B': -1,
        '5A': +1, '5B': -1,
        '6A': -1, '6B': +1,
        '7A': +1, '7B': -1,
        '8A': -1, '8C': +1,
        '10A': -1, '10B': +1,
    },
    BUILD_TO_LAST: {
        '1A': +1, '1B': -1,
        '2A': -1, '2B': +1,
        '3A': -1, '3B': +1,
        '4A': -1, '4B': +1,
        '5B': +1,
        '6A': +1, '6B': -1,
        '7A': -1, '7B': +1,
        '8B': +1,
        '9A': +1, '9B': -1, '9C': -1,
        '10A': -1, '10C': +1,
    }
};

export function calculateAlignmentScore(
    motivation: PlayerMotivation,
    decisions: Array<'A' | 'B' | 'C' | null>
): number {
    let score = 0;
    const alignments = alignmentScores[motivation];

    decisions.forEach((choice, index) => {
        if (!choice) return;
        const key = `${index + 1}${choice}`;
        if (alignments[key]) {
            score += alignments[key];
        }
    });

    return score;
}

export function getAlignmentCategory(score: number): AlignmentCategory {
    if (score >= 5) return 'TRUE_TO_YOURSELF';
    if (score >= 2) return 'MOSTLY_ALIGNED';
    if (score >= -1) return 'COMPROMISED';
    if (score >= -4) return 'LOST_YOUR_WAY';
    return 'BETRAYED_VALUES';
}

export const alignmentLabels: Record<AlignmentCategory, string> = {
    TRUE_TO_YOURSELF: 'True to yourself',
    MOSTLY_ALIGNED: 'Mostly aligned',
    COMPROMISED: 'Compromised',
    LOST_YOUR_WAY: 'Lost your way',
    BETRAYED_VALUES: 'Betrayed your values'
};

export const alignmentReflections: Record<PlayerMotivation, Record<AlignmentCategory, string>> = {
    HELP_PEOPLE: {
        TRUE_TO_YOURSELF: "You made decisions that put users first, even when it cost you. That's rare.",
        MOSTLY_ALIGNED: "You held the line where it mattered. Some compromises were necessary.",
        COMPROMISED: "The pressures were real. Somewhere along the way, the users became abstractions.",
        LOST_YOUR_WAY: "You said you wanted to help people. The data suggests otherwise.",
        BETRAYED_VALUES: "Every decision that could have prioritized users, didn't. What happened?"
    },
    PROVE_MYSELF: {
        TRUE_TO_YOURSELF: "You took the big swings. Win or lose, you know what you're capable of.",
        MOSTLY_ALIGNED: "You pushed when it mattered. Maybe left some chips on the table.",
        COMPROMISED: "You played it safer than you expected to. Was that wisdom or fear?",
        LOST_YOUR_WAY: "You came here to prove something. Instead, you played not to lose.",
        BETRAYED_VALUES: "Every moment that called for boldness, you retreated. What were you afraid of?"
    },
    BUILD_TO_LAST: {
        TRUE_TO_YOURSELF: "You built for the long term, even when short-term pressure was immense. That's rare discipline.",
        MOSTLY_ALIGNED: "You kept your eye on sustainability. A few detours, but the foundation held.",
        COMPROMISED: "The long term kept getting shorter. Quarters have a way of doing that.",
        LOST_YOUR_WAY: "You said you wanted to build something that lasts. The decisions suggest otherwise.",
        BETRAYED_VALUES: "Every choice optimized for now at the expense of later. There might not be a later."
    }
};

export const motivationTitles: Record<PlayerMotivation, string> = {
    HELP_PEOPLE: "To build something that helps people",
    PROVE_MYSELF: "To prove I can build something from nothing",
    BUILD_TO_LAST: "To build something that lasts"
};
