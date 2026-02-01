import type { ConsequenceFlag, Metrics, PlayerMotivation, GameState } from '../types';

export interface DecisionSummary {
    id: number;
    week: number;
    title: string;
    stakeholder: string;
    questionSummary: string;
    choices: {
        id: 'A' | 'B' | 'C';
        title: string;
        description: string;
        impacts: { sat: number; rev: number; tech: number; mkt: number };
        flag?: ConsequenceFlag;
    }[];
    counterfactual: Record<'A' | 'B' | 'C', string[]>;
}

export const decisionSummaries: DecisionSummary[] = [
    {
        id: 1,
        week: 1,
        title: "The Focus Question",
        stakeholder: "Sarah Chen",
        questionSummary: "Sarah asked: Focus on habit tracking, or expand to wellness platform?",
        choices: [
            { id: 'A', title: "Cut to the core", description: "We're a habit tracker. Let's be the best one.", impacts: { sat: 5, rev: -5, tech: 10, mkt: 5 } },
            { id: 'B', title: "Embrace the breadth", description: "The breadth is an asset. Let's integrate these into a daily wellness system.", impacts: { sat: 5, rev: 10, tech: -10, mkt: -5 } }
        ],
        counterfactual: {
            'A': ["REV would have been 15 points higher with more features to monetize", "TECH would have suffered as complexity grew"],
            'B': ["TECH would have been 10 points higher with a focused codebase", "MKT positioning would have been clearer"],
            'C': [] // No C for decision 1
        }
    },
    {
        id: 2,
        week: 3,
        title: "The Monetization Squeeze",
        stakeholder: "Marcus Webb",
        questionSummary: "Marcus asked: How do we extend our runway?",
        choices: [
            { id: 'A', title: "Gate streaks", description: "It's our hook. If they want to keep it, they pay.", impacts: { sat: -20, rev: 25, tech: 0, mkt: -5 }, flag: 'AGGRESSIVE_MONETIZATION' },
            { id: 'B', title: "Launch 'Coach' Tier", description: "Premium insights, not gated features.", impacts: { sat: 5, rev: 10, tech: -10, mkt: 5 } }
        ],
        counterfactual: {
            'A': ["Community backlash would have been avoided", "STRATEGIC_PLAY ending would have remained open"],
            'B': ["REV growth would have been slower but safer", "User trust would have remained high"],
            'C': []
        }
    },
    {
        id: 3,
        week: 6,
        title: "The Viral Opportunity",
        stakeholder: "Sarah Chen",
        questionSummary: "Sarah asked: Do we pivot for the TikTok surge?",
        choices: [
            { id: 'A', title: "Ride the wave", description: "Pivot the roadmap. Gamify everything.", impacts: { sat: -5, rev: 15, tech: -10, mkt: 20 }, flag: 'IDENTITY_DILUTED' },
            { id: 'B', title: "Stay the course", description: "It's a spike, not a strategy.", impacts: { sat: 10, rev: 0, tech: 5, mkt: -10 } }
        ],
        counterfactual: {
            'A': ["Core user retention would have been higher", "Technical debt would have been lower"],
            'B': ["MKT would have surged but crashed later", "You missed a massive short-term revenue bump"],
            'C': []
        }
    },
    {
        id: 4,
        week: 8,
        title: "The Enterprise Deal",
        stakeholder: "Marcus Webb",
        questionSummary: "Marcus asked: Do we sell user data to insurance partners?",
        choices: [
            { id: 'A', title: "Sign the deal", description: "The revenue secures our future.", impacts: { sat: -15, rev: 20, tech: 5, mkt: -10 }, flag: 'TRUST_COMPROMISED' },
            { id: 'B', title: "Reject it", description: "We are not a data broker.", impacts: { sat: 10, rev: -10, tech: 0, mkt: 5 } }
        ],
        counterfactual: {
            'A': ["User trust would have remained intact", "STRATEGIC_PLAY ending would have remained open"],
            'B': ["Revenue pressure would have remained high", "You kept your hands clean"],
            'C': []
        }
    },
    {
        id: 5,
        week: 9,
        title: "The Integration Offer",
        stakeholder: "Sarah Chen",
        questionSummary: "Sarah asked: Do we integrate deeply with Apple Health?",
        choices: [
            { id: 'A', title: "Full integration", description: "Better UX, but we live in their garden.", impacts: { sat: 10, rev: 10, tech: 5, mkt: -5 }, flag: 'PLATFORM_LOCKED' },
            { id: 'B', title: "Keep it neutral", description: "Support it, but don't rely on it.", impacts: { sat: -5, rev: -5, tech: 0, mkt: 10 } }
        ],
        counterfactual: {
            'A': ["Independence would have been preserved", "You could have pivoted more easily later"],
            'B': ["Detailed health metrics would have been harder to track", "User friction would have remained higher"],
            'C': []
        }
    },
    {
        id: 6,
        week: 11,
        title: "The Technical Debt Reckoning",
        stakeholder: "Elena", // Implicit
        questionSummary: "Fix the notifications, or ship the new onboarding?",
        choices: [
            { id: 'A', title: "Fix the foundation", description: "We can't grow on broken infrastructure.", impacts: { sat: 15, rev: -10, tech: 15, mkt: -5 } },
            { id: 'B', title: "Ship the story", description: "We need the growth narrative for Series A.", impacts: { sat: -10, rev: 10, tech: -15, mkt: 10 }, flag: 'DEBT_COMPOUNDING' }
        ],
        counterfactual: {
            'A': ["SAT and TECH would have recovered", "Elena's offer in D9 would have felt different", "REV would have been 10 points lower"],
            'B': ["TECH dropped critically low", "DEBT_COMPOUNDING blocked equity counter with Elena", "Short-term REV and MKT boosted"],
            'C': []
        }
    },
    {
        id: 7,
        week: 12,
        title: "The Competitor's Attack",
        stakeholder: "Marcus Webb",
        questionSummary: "A clone app is undercutting us. How do we respond?",
        choices: [
            { id: 'A', title: "Ignore them", description: "Focus on our own product.", impacts: { sat: 5, rev: -5, tech: 5, mkt: -5 } },
            { id: 'B', title: "Go loud", description: "Call them out. Highlight our privacy/quality differences.", impacts: { sat: 0, rev: 5, tech: 0, mkt: 15 } }
        ],
        counterfactual: {
            'A': ["MKT position would have been stronger", "Users wanted to see you fight back"],
            'B': ["You dignified a clone with attention", "You focused on product over noise"],
            'C': []
        }
    },
    {
        id: 8,
        week: 13,
        title: "The Community Revolt",
        stakeholder: "Sarah Chen",
        questionSummary: "Power users are angry about recent changes.",
        choices: [
            { id: 'A', title: "Apologize and roll back", description: "Admit the mistake.", impacts: { sat: 15, rev: -15, tech: -5, mkt: 5 } },
            { id: 'B', title: "Hold the line", description: "They'll adapt. We have the data.", impacts: { sat: -15, rev: 10, tech: 5, mkt: -5 } },
            { id: 'C', title: "Compromise", description: "Keep the change, but add legacy mode.", impacts: { sat: 5, rev: 0, tech: -10, mkt: 0 } }
        ],
        counterfactual: {
            'A': ["Revenue would have taken a hit", "Trust would be restored"],
            'B': ["You would have kept the revenue", "You alienated your core advocates"],
            'C': ["Complexity increased significantly", "A middle ground that pleased no one"]
        }
    },
    {
        id: 9,
        week: 14,
        title: "The Co-Founder Conflict",
        stakeholder: "Elena",
        questionSummary: "Elena accepts an offer from Google. She's leaving.",
        choices: [
            { id: 'A', title: "Let her go", description: "We can't match Google.", impacts: { sat: -5, rev: 0, tech: -20, mkt: -5 }, flag: 'NO_TECHNICAL_LEADER' },
            { id: 'B', title: "Counter with equity", description: "Give her more stake to stay.", impacts: { sat: 5, rev: -5, tech: 10, mkt: 0 } },
            { id: 'C', title: "Guilt trip", description: "Remind her of the mission.", impacts: { sat: -10, rev: 0, tech: -5, mkt: -5 } }
        ],
        counterfactual: {
            'A': ["You lost your technical soul", "Series A became much harder"],
            'B': ["Cap table would be messy", "You kept your best engineer"],
            'C': ["She left anyway, and angry", "Relationships matter"]
        }
    },
    {
        id: 10, // Maps to Code Decision ID 9 (0-indexed)
        week: 15,
        title: "The Final Pitch",
        stakeholder: "The Board",
        questionSummary: "We have one shot. What is the story?",
        choices: [
            { id: 'A', title: "The Exit", description: "Sell to the competitor.", impacts: { sat: -10, rev: 20, tech: 0, mkt: -10 } },
            { id: 'B', title: "The Raise", description: "Series A. We go big.", impacts: { sat: 0, rev: 0, tech: 0, mkt: 0 } }, // Logic handled in engine
            { id: 'C', title: "The Partnership", description: "Strategic deal to stay independent.", impacts: { sat: 10, rev: 5, tech: 5, mkt: 10 } }
        ],
        counterfactual: {
            'A': ["You gave up control", "It was a safe landing"],
            'B': ["High risk, high reward", "Metrics needed to be perfect"],
            'C': ["Independence preserved", "Requires a clean history"]
        }
    }
];

export const flagDescriptions: Record<string, { title: string; summary: string }> = {
    AGGRESSIVE_MONETIZATION: {
        title: "AGGRESSIVE_MONETIZATION",
        summary: "Gating streaks signaled your priorities"
    },
    PLATFORM_LOCKED: {
        title: "PLATFORM_LOCKED",
        summary: "Deep Apple integration limited your independence"
    },
    IDENTITY_DILUTED: {
        title: "IDENTITY_DILUTED",
        summary: "The viral pivot changed your core audience"
    },
    TRUST_COMPROMISED: {
        title: "TRUST_COMPROMISED",
        summary: "Enterprise data sharing eroded user trust"
    },
    DEBT_COMPOUNDING: {
        title: "DEBT_COMPOUNDING",
        summary: "Shipping over fixing began the debt spiral"
    },
    NO_TECHNICAL_LEADER: {
        title: "NO_TECHNICAL_LEADER",
        summary: "Elena's departure left a critical knowledge gap"
    }
};

export const flagConsequences: Record<string, { blockedAt: number; blockedChoice: string; explanation: string }> = {
    AGGRESSIVE_MONETIZATION: {
        blockedAt: 10,
        blockedChoice: "Counter with partnership",
        explanation: "Strategic partners couldn't align with your monetization philosophy."
    },
    PLATFORM_LOCKED: {
        blockedAt: 7,
        blockedChoice: "Go loud",
        explanation: "You couldn't credibly position as independent while dependent on Apple."
    },
    IDENTITY_DILUTED: {
        blockedAt: 8,
        blockedChoice: "Hold the line",
        explanation: "Your pivot to the TikTok audience undermined your credibility with power users."
    },
    TRUST_COMPROMISED: {
        blockedAt: 10,
        blockedChoice: "Counter with partnership",
        explanation: "Your data practices raised red flags in partner due diligence."
    },
    DEBT_COMPOUNDING: {
        blockedAt: 9,
        blockedChoice: "Counter with equity",
        explanation: "Elena knew your promises about technical investment couldn't be trusted."
    },
    NO_TECHNICAL_LEADER: {
        blockedAt: 10,
        blockedChoice: "Counter with partnership",
        explanation: "Without Elena, you lacked the technical credibility for a strategic deal."
    }
};

export function calculatePhilosophy(
    flags: Set<ConsequenceFlag>
): { label: string; description: string } {
    // Simplified logic based on flags
    const flagCount = flags.size;

    if (flagCount === 0) {
        return {
            label: "The Balanced Operator",
            description: "You navigated without closing doors."
        };
    }

    if (flagCount >= 3) {
        return {
            label: "The Aggressive Bettor",
            description: "You moved fast. Some things broke."
        };
    }

    if (flags.has('AGGRESSIVE_MONETIZATION') || flags.has('IDENTITY_DILUTED')) {
        return {
            label: "The Growth Optimist",
            description: "You consistently chose momentum over maintenance."
        };
    }

    if (flags.has('DEBT_COMPOUNDING')) {
        return {
            label: "The Velocity Chaser",
            description: "You prioritized shipping over stability."
        };
    }

    return {
        label: "The Pragmatist",
        description: "You took each decision as it came."
    };
}

export interface EndingAnalysis {
    ending: string;
    title: string;
    tagline: string;
    status: 'achieved' | 'metrics' | 'blocked' | 'choice';
    explanation: string;
    closestPath: string;
}

export function analyzeEndings(gameState: GameState): EndingAnalysis[] {
    const achieved = gameState.ending?.id;
    const avg = (gameState.metrics.satisfaction + gameState.metrics.revenue +
        gameState.metrics.technicalHealth + gameState.metrics.marketPosition) / 4;
    const analyses: EndingAnalysis[] = [];

    // Hardcoded analysis for main endings
    if (achieved !== 'SUSTAINABLE_SUCCESS') {
        analyses.push({
            ending: 'SUSTAINABLE_SUCCESS',
            title: 'Sustainable Success',
            tagline: 'The harder journey begins.',
            status: avg < 70 ? 'metrics' : 'choice',
            explanation: avg < 70
                ? `Your average health was ${Math.round(avg)}%. This ending required ≥70%.`
                : `You chose to exit rather than raise.`,
            closestPath: "Fixing the foundation (D6) and committing to Elena (D9) would have raised TECH significantly."
        });
    }

    if (achieved !== 'STRATEGIC_PLAY') {
        const blockingFlag = ['AGGRESSIVE_MONETIZATION', 'TRUST_COMPROMISED', 'NO_TECHNICAL_LEADER']
            .find(f => gameState.flags.has(f as ConsequenceFlag));

        analyses.push({
            ending: 'STRATEGIC_PLAY',
            title: 'Strategic Play',
            tagline: 'Independence preserved.',
            status: blockingFlag ? 'blocked' : 'choice',
            explanation: blockingFlag
                ? `Flag ${blockingFlag} blocked the partnership option in Decision 10.`
                : `You chose a different path in Decision 10.`,
            closestPath: blockingFlag === 'AGGRESSIVE_MONETIZATION'
                ? "Building the Coach tier (D2B) instead of gating streaks would have kept this path open."
                : "Avoiding decisions that set blocking flags would have preserved this option."
        });
    }

    return analyses;
}

export interface SavedRun {
    id: string;
    timestamp: number;
    ending: string;
    finalMetrics: Metrics;
    decisions: Array<'A' | 'B' | 'C'>;
    flags: string[];
    motivation: PlayerMotivation;
    alignmentScore: number;
    philosophy: string;
}

export function saveRun(gameState: GameState): void {
    const runs = JSON.parse(localStorage.getItem('steadfast_runs') || '[]');

    const philosophicalLabel = calculatePhilosophy(gameState.flags).label;

    const newRun: SavedRun = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        ending: gameState.ending?.id || 'UNKNOWN',
        finalMetrics: { ...gameState.metrics },
        decisions: gameState.decisionsMade // These are DecisionChoice, which maps to 'A'|'B'|'C' (actually they are strings A/B/C)
            .filter((d): d is any => d !== null) as any,
        flags: Array.from(gameState.flags),
        motivation: gameState.motivation!,
        alignmentScore: gameState.alignmentScore || 0,
        philosophy: philosophicalLabel
    };

    // Keep only last 3 runs
    const updatedRuns = [newRun, ...runs].slice(0, 3);
    localStorage.setItem('steadfast_runs', JSON.stringify(updatedRuns));
}

export function loadRuns(): SavedRun[] {
    return JSON.parse(localStorage.getItem('steadfast_runs') || '[]');
}
