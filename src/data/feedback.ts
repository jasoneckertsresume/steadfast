import type { Metrics } from '../types';

interface ReviewSnippet {
    trigger: {
        afterDecision: number;
        choice?: 'A' | 'B' | 'C';
        ratingAbove?: number;
        ratingBelow?: number;
    };
    text: string;
}

const decisionSpecificReviews: ReviewSnippet[] = [
    // Decision 2
    { trigger: { afterDecision: 1, choice: 'A' }, text: "Premium for STREAKS? Uninstalling." }, // ID 1 = Decision 2
    { trigger: { afterDecision: 1, choice: 'B', ratingAbove: 4.0 }, text: "The AI coach is worth every penny." },
    { trigger: { afterDecision: 1, choice: 'B', ratingBelow: 4.0 }, text: "Coach feature feels half-baked." },

    // Decision 3
    { trigger: { afterDecision: 2, choice: 'A', ratingAbove: 4.0 }, text: "Lock screen widget is a game changer." }, // ID 2 = Decision 3
    { trigger: { afterDecision: 2, choice: 'A', ratingBelow: 4.0 }, text: "Great on iPhone. Android feels neglected." },

    // Decision 4
    { trigger: { afterDecision: 3, choice: 'A' }, text: "Used to be for self-improvement. Now it's TikTok fodder." }, // ID 3 = Decision 4
    { trigger: { afterDecision: 3, choice: 'B', ratingAbove: 4.0 }, text: "Love that they didn't sell out." },

    // Decision 5
    { trigger: { afterDecision: 4, choice: 'A', ratingBelow: 4.0 }, text: "Wait, they're selling our data to employers?" }, // ID 4 = Decision 5

    // Decision 6
    { trigger: { afterDecision: 5, choice: 'B' }, text: "My reminders stopped working. Anyone else?" }, // ID 5 = Decision 6

    // Decision 8
    { trigger: { afterDecision: 7, choice: 'A', ratingAbove: 4.0 }, text: "They actually listened! Old swipe is back." }, // ID 7 = Decision 8
    { trigger: { afterDecision: 7, choice: 'C', ratingBelow: 4.0 }, text: "You fixed what wasn't broken." },
    { trigger: { afterDecision: 7, choice: 'C', ratingAbove: 4.0 }, text: "New gesture took a day to learn. It's better." }
];

const genericReviews: Record<string, string[]> = {
    high: [ // SAT >= 70
        "Finally, an app that respects my time.",
        "Simple. Effective. No BS.",
        "This app actually changed my habits."
    ],
    medium: [ // SAT 50-69
        "It's fine. Does what it says.",
        "Good concept, some rough edges.",
        "Better than most, worse than it could be."
    ],
    low: [ // SAT 30-49
        "What happened to this app?",
        "Used to love this. Not anymore.",
        "Feels like the team stopped caring."
    ],
    critical: [ // SAT < 30
        "Uninstalled. Don't bother.",
        "A masterclass in how to lose users.",
        "RIP to what this used to be."
    ]
};

const baseQuotes: Record<string, string[]> = {
    excellent: [ // >= 80
        "This is it. I can feel it.",
        "We're building something real.",
        "The board is going to love this."
    ],
    good: [ // 60-79
        "We're finding our footing.",
        "Keep pushing. We're close.",
        "Good progress. Stay focused."
    ],
    uncertain: [ // 40-59
        "I need to see more.",
        "We can't afford to stall.",
        "The board is asking questions."
    ],
    worried: [ // 20-39
        "I'm worried.",
        "This isn't what I signed up for.",
        "We need to talk about our trajectory."
    ],
    critical: [ // < 20
        "I don't know if we can come back from this.",
        "What happened to us?",
        "I'm running out of ways to spin this."
    ]
};

const decisionQuotes: Record<string, string> = {
    '0A': "Bold call. I hope you're right.", // ID 0 = Decision 1
    '0B': "Ambitious. Let's see if we can execute.",
    '1A': "The revenue team is happy. Watch the reviews.", // ID 1 = Decision 2
    '1B': "I like the vision. It's a lot to build.",
    '2A': "Big distribution play. We're betting on Apple.", // ID 2 = Decision 3
    '2B': "Independence is expensive. Worth it?",
    '3A': "I love the energy. Who are we now, though?", // ID 3 = Decision 4
    '3B': "Disciplined. I respect it. David might not.",
    '4A': "First enterprise revenue. This changes things.", // ID 4 = Decision 5
    '4B': "You walked away from money. Explain it to me.",
    '5A': "This is going to hurt the fundraise story.", // ID 5 = Decision 6
    '5B': "Good. We need wins right now.",
    '6A': "Let's make some noise.", // ID 6 = Decision 7
    '6B': "Heads down. I get it.",
    '7A': "We look indecisive.", // ID 7 = Decision 8
    '7B': "Compromise. Fine.",
    '7C': "Conviction. I like it.",
    '8A': "That's a big commitment. Honor it.", // ID 8 = Decision 9
    '8B': "She's going to see through that.",
    '8C': "We just lost a lot of knowledge."
};

// Calculations

export function calculateRating(satisfaction: number): number {
    if (satisfaction <= 20) return 1.0 + (satisfaction / 20);
    if (satisfaction <= 40) return 2.0 + ((satisfaction - 20) / 20);
    if (satisfaction <= 60) return 3.0 + ((satisfaction - 40) / 20);
    if (satisfaction <= 80) return 4.0 + ((satisfaction - 60) / 40);
    return 4.5 + ((satisfaction - 80) / 40);
}

export function displayRating(rating: number): number {
    return Math.round(rating * 2) / 2;
}

export function calculateConfidence(metrics: Metrics): number {
    return Math.round(
        (metrics.revenue * 0.4) +
        (metrics.marketPosition * 0.3) +
        (metrics.satisfaction * 0.2) +
        (metrics.technicalHealth * 0.1)
    );
}

// Selectors

export function getGenericReview(satisfaction: number): string {
    let pool: string[];
    if (satisfaction >= 70) pool = genericReviews.high;
    else if (satisfaction >= 50) pool = genericReviews.medium;
    else if (satisfaction >= 30) pool = genericReviews.low;
    else pool = genericReviews.critical;

    return pool[Math.floor(Math.random() * pool.length)];
}

export function selectReview(
    currentDecision: number, // The decision currently being viewed (future decision index)
    lastChoice: 'A' | 'B' | 'C' | null, // The choice made in the PREVIOUS decision
    rating: number,
    satisfaction: number
): string {
    // We want to trigger based on the LAST decision made. 
    // currentDecision is index of NEXT decision. So last decision index = currentDecision - 1

    // NOTE: The IDs in decisionSpecificReviews are based on prompts "After Decision X".
    // My ID mapping:
    // Decision 1 (ID 0)
    // Decision 2 (ID 1)

    // If we are at Decision 3 (ID 2), we just finished Decision 2 (ID 1).
    // The snippet says: { trigger: { afterDecision: 1, ... } }
    // So if `currentDecision - 1 === trigger.afterDecision`, we check it.

    const lastDecisionId = currentDecision - 1;

    if (lastChoice !== null) {
        for (const review of decisionSpecificReviews) {
            const t = review.trigger;
            if (t.afterDecision === lastDecisionId) {
                if (t.choice && t.choice !== lastChoice) continue;
                if (t.ratingAbove !== undefined && rating <= t.ratingAbove) continue;
                if (t.ratingBelow !== undefined && rating >= t.ratingBelow) continue;
                return review.text;
            }
        }
    }

    // Fallback to generic
    return getGenericReview(satisfaction);
}

function getBaseQuote(confidence: number): string {
    let pool: string[];
    if (confidence >= 80) pool = baseQuotes.excellent;
    else if (confidence >= 60) pool = baseQuotes.good;
    else if (confidence >= 40) pool = baseQuotes.uncertain;
    else if (confidence >= 20) pool = baseQuotes.worried;
    else pool = baseQuotes.critical;

    return pool[Math.floor(Math.random() * pool.length)];
}

export function getSarahQuote(
    currentDecision: number,
    lastChoice: 'A' | 'B' | 'C' | null,
    confidence: number
): string {
    const lastDecisionId = currentDecision - 1;

    if (lastChoice) {
        const key = `${lastDecisionId}${lastChoice}`;
        if (decisionQuotes[key]) {
            return decisionQuotes[key];
        }
    }
    return getBaseQuote(confidence);
}
