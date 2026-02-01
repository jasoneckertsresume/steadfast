import type { ConsequenceFlag } from '../types';

export interface BlockedChoice {
    decisionId: number;
    choice: 'A' | 'B' | 'C';
    blockedBy: ConsequenceFlag;
    message: string;
    requirement: string;
}

const blockedChoices: BlockedChoice[] = [
    {

        // Decision 7 in prompt is "The Competitor Responds" which is ID 6 in 'decisions.ts' (Week 13)
        // Wait, let's check decisions.ts IDs.
        // D1 -> ID 0
        // D2 -> ID 1
        // ...
        // D7 -> ID 6 (Competitor Responds)
        // D8 -> ID 7 (User Revolt)
        // D9 -> ID 8 (Acqui-hire)
        // D10 -> ID 9 (Defining Bet)

        // Prompt says:
        // Decision 7 (Competitor): "Choice A blocked by PLATFORM_LOCKED"
        // In decisions.ts, Competitor is ID 6.
        choice: 'A',
        decisionId: 6,
        blockedBy: 'PLATFORM_LOCKED',
        message: "You can't credibly position as the independent alternative when 60% of your features depend on Apple's framework. The press would see through it immediately.",
        requirement: "Platform independence (Decision 3)"
    },
    {
        decisionId: 7, // User Revolt (ID 7)
        choice: 'C',
        blockedBy: 'IDENTITY_DILUTED',
        message: "You pivoted for the TikTok audience in Week 7. Your power users already know where your priorities lie. \"Stay the course\" rings hollow now.",
        requirement: "Staying focused on core users (Decision 4)"
    },
    {
        decisionId: 8, // Acqui-hire (ID 8)
        choice: 'B',
        blockedBy: 'DEBT_COMPOUNDING',
        message: "Elena watched you choose the growth story over fixing notifications. She knows what \"it gets better after Series A\" really means. Equity won't fix credibility.",
        requirement: "Investing in technical health (Decision 6)"
    }
];

const d10BlockingFlags: ConsequenceFlag[] = [
    'AGGRESSIVE_MONETIZATION',
    'TRUST_COMPROMISED',
    'NO_TECHNICAL_LEADER'
];

export function isChoiceBlocked(
    decisionId: number,
    choice: 'A' | 'B' | 'C',
    flags: Set<ConsequenceFlag>
): BlockedChoice | null {
    // Special case for D10C (ID 9)
    if (decisionId === 9 && choice === 'C') {
        for (const flag of d10BlockingFlags) {
            if (flags.has(flag)) {
                let message = "";
                let req = "• User-first monetization (Decision 2)\n• Privacy-preserving data practices (Decision 5)\n• Technical leadership continuity (Decision 9)";

                if (flag === 'AGGRESSIVE_MONETIZATION') {
                    message = "Strategic partners did their diligence. Your decision to gate streaks signaled a monetization philosophy they couldn't align with.";
                } else if (flag === 'TRUST_COMPROMISED') {
                    message = "Strategic partners did their diligence. Your enterprise data practices raised red flags in their privacy review.";
                } else if (flag === 'NO_TECHNICAL_LEADER') {
                    message = "Strategic partners did their diligence. Without Elena, you don't have the technical credibility for a strategic deal.";
                }

                return {
                    decisionId: 9,
                    choice: 'C',
                    blockedBy: flag,
                    message,
                    requirement: req
                };
            }
        }
    }

    // Standard blocking
    const blocked = blockedChoices.find(
        b => b.decisionId === decisionId &&
            b.choice === choice &&
            flags.has(b.blockedBy)
    );

    return blocked || null;
}
