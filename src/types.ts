export interface Metrics {
    satisfaction: number;  // 0-100
    revenue: number;       // 0-100
    technicalHealth: number; // 0-100
    marketPosition: number;  // 0-100
}

export type DecisionChoice = 'A' | 'B' | 'C';

export type ConsequenceFlag =
    | 'AGGRESSIVE_MONETIZATION'
    | 'PLATFORM_LOCKED'
    | 'IDENTITY_DILUTED'
    | 'TRUST_COMPROMISED'
    | 'DEBT_COMPOUNDING'
    | 'NO_TECHNICAL_LEADER';

export interface Choice {
    id: DecisionChoice;
    title: string;
    description: string;
    effect: {
        satisfaction: number;
        revenue: number;
        technicalHealth: number;
        marketPosition: number;
    };
    triggerFlag?: ConsequenceFlag;
}

export interface Decision {
    id: number;
    week: number;
    stakeholder: {
        name: string;
        role: string;
        quote: string;
        avatar?: string; // Optional icon/initials
    };
    choices: {
        A: Choice;
        B: Choice;
        C?: Choice;
    };
}

export interface EndingDetails {
    id: string;
    title: string;
    tagline: string;
    epilogue: string;
}

export type PlayerMotivation = 'HELP_PEOPLE' | 'PROVE_MYSELF' | 'BUILD_TO_LAST';

export interface GameState {
    phase: 'landing' | 'opening-motivation' | 'playing' | 'interstitial' | 'ending' | 'postmortem-timeline' | 'postmortem-detail' | 'postmortem-counterfactual';
    currentDecisionIndex: number; // 0-9
    metrics: Metrics;
    decisionsMade: Array<DecisionChoice | null>;
    lastChoice: DecisionChoice | null;
    flags: Set<ConsequenceFlag>;
    motivation: PlayerMotivation | null;
    alignmentScore?: number;
    gameOver: boolean;
    ending: EndingDetails | null;
    postmortemDecision: number | null; // For detail view
}

export type AlignmentCategory =
    | 'TRUE_TO_YOURSELF'
    | 'MOSTLY_ALIGNED'
    | 'COMPROMISED'
    | 'LOST_YOUR_WAY'
    | 'BETRAYED_VALUES';

export const initialMetrics: Metrics = {
    satisfaction: 60,
    revenue: 40,
    technicalHealth: 70,
    marketPosition: 50
};
