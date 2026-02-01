import type { EndingDetails, ConsequenceFlag } from '../types';

export const endings: Record<string, EndingDetails> = {
    SOFT_LANDING: {
        id: 'SOFT_LANDING',
        title: "Exit Velocity",
        tagline: "You built something real enough that someone wanted to buy it.",
        epilogue: "The acquisition closes in 60 days. Sarah cries in the parking lot—relief, not joy. You update your LinkedIn. Three months later, you see the app icon has changed. They kept the name. They killed the streak feature on day one."
    },
    SUSTAINABLE_SUCCESS: {
        id: 'SUSTAINABLE_SUCCESS',
        title: "Series A",
        tagline: "The harder journey begins.",
        epilogue: "The round closes at $12M. David sends champagne you'll never open. Elena asks when the tech health sprint starts—she's holding you to it. You hire three engineers in the first month. On the last day of the quarter, Sarah sends a one-line Slack: 'We might actually pull this off.'"
    },
    GRINDING_FORWARD: {
        id: 'GRINDING_FORWARD',
        title: "Term Sheet",
        tagline: "You raised. But on tough terms.",
        epilogue: "The round closes, barely. 2x liquidation preference. Board seat for a partner you've never met. At the signing dinner, David tells a story about another company that 'figured it out in year two.' You can't tell if it's encouragement or warning. You have 18 months to find out."
    },
    PYRRHIC_VICTORY: {
        id: 'PYRRHIC_VICTORY',
        title: "Hollow Victory",
        tagline: "You got the money. The cracks are already showing.",
        epilogue: "The wire hits. The celebration feels forced. Marcus quits the next week—his Slack status just says 'building something else.' You find a draft of his resignation letter in a shared doc. It's dated three weeks ago. He was waiting to see what you'd choose."
    },
    BELOVED_FAILURE: {
        id: 'BELOVED_FAILURE',
        title: "User Love",
        tagline: "They loved you. Investors didn't.",
        epilogue: "The round doesn't come together. Your NPS is 78—higher than Slack's was at this stage. Your runway is 4 months. One user emails to ask if everything is okay. She noticed the updates stopped. Sarah asks if you'd do it again. You're not sure how to answer."
    },
    TOXIC_GROWTH: {
        id: 'TOXIC_GROWTH',
        title: "Growth Trap",
        tagline: "The metrics looked great. The product felt hollow.",
        epilogue: "The charts go up and to the right. The Glassdoor reviews go the other direction: 'Great metrics culture. No soul.' Your biggest user cohort is people who installed the app, got charged, and forgot to cancel. Sarah does a podcast about 'growth lessons.' You listen to it on your commute. She sounds tired."
    },
    SYSTEM_COLLAPSE: {
        id: 'SYSTEM_COLLAPSE',
        title: "Technical Bankruptcy",
        tagline: "You shipped fast until you couldn't ship at all.",
        epilogue: "The notification system finally fails completely. 40% of users churn in a week. Elena's already at Apple—she left her desk plant behind. Marcus is still in the codebase at 2am, writing comments that no one will ever read. The last commit message is just: 'I tried.'"
    },
    STRATEGIC_PLAY: {
        id: 'STRATEGIC_PLAY',
        title: "The Long Game",
        tagline: "Independence preserved. The real test begins.",
        epilogue: "The partnership gives you distribution without control. Your app is pre-installed on 2 million devices. You're in rooms you never expected to be in, negotiating with people who could buy your company as a rounding error. Sarah calls it 'playing chess with giants.' It's a tightrope. But for the first time, you can see the other side."
    }
};

const flagCallbacks: Record<ConsequenceFlag, string> = {
    AGGRESSIVE_MONETIZATION: "The streak paywall haunted you. Users don't forget when you take something away.",
    PLATFORM_LOCKED: "You bet on Apple. When the board asked about Android, you didn't have a good answer.",
    IDENTITY_DILUTED: "The TikTok pivot changed who you were building for. Your original users noticed.",
    TRUST_COMPROMISED: "The enterprise data decision followed you. Trust, once broken, leaves a residue.",
    DEBT_COMPOUNDING: "The notification bug. Fifteen percent of users, failing silently. You knew, and you shipped anyway.",
    NO_TECHNICAL_LEADER: "Elena's departure left a hole that couldn't be backfilled. Some knowledge can't be transferred."
};

const noFlagsCallback = "You navigated without closing doors. Every path remained open. That's harder than it sounds.";

export function getDecisionCallbacks(flags: Set<ConsequenceFlag>): string[] {
    if (flags.size === 0) {
        return [noFlagsCallback];
    }

    // Return up to 3 callbacks
    const callbacks: string[] = [];
    for (const flag of flags) {
        if (callbacks.length >= 3) break;
        if (flagCallbacks[flag]) {
            callbacks.push(flagCallbacks[flag]);
        }
    }
    return callbacks;
}
