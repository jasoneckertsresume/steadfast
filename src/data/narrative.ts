export const interstitials: Record<number, { week: number; lines: string[] }> = {
    1: { // After Decision 2 (ID 1), Prompt says "After Decision 2". Decisions are 0-indexed in code?
        // decisions.ts: Decision 1 is ID 0. Decision 2 is ID 1.
        // Prompt says "After Decision 2 - The Bakery".
        // So if currentDecisionIndex was 1 (Decision 2), we show this.
        week: 4,
        lines: [
            "The bakery downstairs started leaving a box of day-old croissants outside your door.",
            "Sarah says they feel bad about the noise from our late nights.",
            "You're not sure if that's a good sign or a bad one."
        ]
    },
    3: { // After Decision 4 (ID 3)
        week: 8,
        lines: [
            "You check the dashboard six times before lunch.",
            "Downloads. Retention. Conversion. Revenue.",
            "The numbers are just numbers until they're not."
        ]
    },
    5: { // After Decision 6 (ID 5)
        week: 12,
        lines: [
            "Sarah's office light is still on at 11pm.",
            "It's been on every night this week.",
            "You pretend not to notice. She pretends not to notice you noticing."
        ]
    },
    7: { // After Decision 8 (ID 7)
        week: 16,
        lines: [
            "Marcus posts in #random: \"Remember when this was fun?\"",
            "Three laugh reacts. One heart. No replies.",
            "You close the tab."
        ]
    }
};

// IDs match decisions.ts (0-9)
export const internalMonologue: Record<number, string> = {
    0: "First real decision. It's going to set a tone.",
    1: "You think about the users who email Sarah to say thank you. The ones who would never pay.",
    2: "Control versus distribution. The oldest trade in the book.",
    3: "Opportunity doesn't knock twice. But neither does identity.",
    4: "You think about terms of service no one reads. About trust that takes years to build.",
    5: "Fifteen percent. Real people. Setting reminders that never fire. Blaming themselves.",
    6: "They have more money, more people, more time. You have... what?",
    7: "Power users are loud. New users are quiet. Which signal do you trust?",
    8: "People are not resources. But resources are what you have to work with.",
    9: "You think about why you took this job in the first place."
};

// Helper to check if we should show an interstitial after a decision ID
export const shouldShowInterstitial = (decisionId: number): boolean => {
    return false; // Interstitials disabled per user request
    // return !!interstitials[decisionId];
};
