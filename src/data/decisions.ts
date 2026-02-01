import type { Decision } from '../types';

export const decisions: Decision[] = [
    {
        id: 0,
        week: 1,
        stakeholder: {
            name: "Sarah Chen",
            role: "CEO / Founder",
            quote: "We're spread thin. I've been saying yes to everything—habit tracking, mood logging, goal setting, journaling. Users asked for all of it. But nothing feels great. What's your read?"
        },
        choices: {
            A: {
                id: 'A',
                title: "Cut to the core",
                description: "We're a habit tracker. Let's be the best one.",
                effect: { satisfaction: 5, revenue: -5, technicalHealth: 10, marketPosition: 5 }
            },
            B: {
                id: 'B',
                title: "Embrace the breadth",
                description: "The breadth is an asset. Let's integrate these into a daily wellness system.",
                effect: { satisfaction: 5, revenue: 10, technicalHealth: -10, marketPosition: -5 }
            }
        }
    },
    {
        id: 1,
        week: 3,
        stakeholder: {
            name: "David Park",
            role: "Lead Investor",
            quote: "2% conversion is fine for consumer apps, but it won't get you to Series A metrics. You need to either push harder on premium or find another lever. What's the play?"
        },
        choices: {
            A: {
                id: 'A',
                title: "Gate the streaks",
                description: "Streaks are our stickiest feature. Make them earn their keep.",
                effect: { satisfaction: -15, revenue: 15, technicalHealth: 0, marketPosition: -5 },
                triggerFlag: 'AGGRESSIVE_MONETIZATION'
            },
            B: {
                id: 'B',
                title: "Build a Coach tier",
                description: "AI-powered insights at a premium. Don't take away—add value.",
                effect: { satisfaction: 5, revenue: 5, technicalHealth: -10, marketPosition: 10 }
            }
        }
    },
    {
        id: 2,
        week: 5,
        stakeholder: {
            name: "Marcus Webb",
            role: "Engineering Lead",
            quote: "If we integrate with Apple's new framework, we get lock screen widgets, Siri, Health app sync—stuff we can't build ourselves. But we're handing Apple the keys. They could sherlock us in two years."
        },
        choices: {
            A: {
                id: 'A',
                title: "Integrate deeply",
                description: "The distribution benefits outweigh the platform risk.",
                effect: { satisfaction: 10, revenue: 5, technicalHealth: -5, marketPosition: -10 },
                triggerFlag: 'PLATFORM_LOCKED'
            },
            B: {
                id: 'B',
                title: "Stay platform-agnostic",
                description: "Build our own system. We control our destiny.",
                effect: { satisfaction: -5, revenue: -5, technicalHealth: 5, marketPosition: 10 }
            }
        }
    },
    {
        id: 3,
        week: 7,
        stakeholder: {
            name: "Priya Sharma",
            role: "Head of Growth",
            quote: "A TikTok creator with 2M followers just posted about us. Downloads spiked 400%. Most new users are teens doing 'aesthetic morning routines.' This is the moment—do we ride it?"
        },
        choices: {
            A: {
                id: 'A',
                title: "Ride the wave",
                description: "Build for virality. Add shareable streak cards. Capture the moment.",
                effect: { satisfaction: -10, revenue: 10, technicalHealth: -5, marketPosition: 15 },
                triggerFlag: 'IDENTITY_DILUTED'
            },
            B: {
                id: 'B',
                title: "Stay the course",
                description: "Welcome them, but don't pivot. Our core users come first.",
                effect: { satisfaction: 10, revenue: -5, technicalHealth: 5, marketPosition: -10 }
            }
        }
    },
    {
        id: 4,
        week: 9,
        stakeholder: {
            name: "Sarah Chen",
            role: "CEO / Founder",
            quote: "A corporate wellness company wants to pilot Steadfast for 10,000 employees. They want aggregated habit data by department—anonymized, they say. It's our first real B2B opportunity."
        },
        choices: {
            A: {
                id: 'A',
                title: "Take the deal",
                description: "Anonymized aggregate data is standard. This opens enterprise revenue.",
                effect: { satisfaction: -10, revenue: 15, technicalHealth: -5, marketPosition: 5 },
                triggerFlag: 'TRUST_COMPROMISED'
            },
            B: {
                id: 'B',
                title: "Decline—or counter",
                description: "Our users didn't sign up to be workforce metrics. Protect the trust.",
                effect: { satisfaction: 10, revenue: -10, technicalHealth: 5, marketPosition: 5 }
            }
        }
    },
    {
        id: 5,
        week: 11,
        stakeholder: {
            name: "Marcus Webb",
            role: "Engineering Lead",
            quote: "I need to level with you. We can ship the new onboarding, OR we can fix the notification bug that's been silently failing for 15% of users. They think they're getting reminders—they aren't. We can't do both."
        },
        choices: {
            A: {
                id: 'A',
                title: "Fix the foundation",
                description: "We can't grow on broken infrastructure. Fix notifications.",
                effect: { satisfaction: 15, revenue: -10, technicalHealth: 15, marketPosition: -5 }
            },
            B: {
                id: 'B',
                title: "Ship the story",
                description: "We need the growth narrative for Series A. Notifications wait.",
                effect: { satisfaction: -10, revenue: 10, technicalHealth: -15, marketPosition: 10 },
                triggerFlag: 'DEBT_COMPOUNDING'
            }
        }
    },
    {
        id: 6,
        week: 13,
        stakeholder: {
            name: "David Park",
            role: "Lead Investor",
            quote: "Habitica just launched a 'minimalist mode' that looks... familiar. Press is calling you 'the original,' but also asking if you can survive. They have 5x your resources. How do you respond?"
        },
        choices: {
            A: {
                id: 'A',
                title: "Go loud",
                description: "Own the narrative. 'Minimalist before it was a feature toggle.'",
                effect: { satisfaction: 5, revenue: -5, technicalHealth: 0, marketPosition: 15 }
            },
            B: {
                id: 'B',
                title: "Go quiet",
                description: "Ignore them. Ship faster. Let the product speak.",
                effect: { satisfaction: 5, revenue: 5, technicalHealth: 5, marketPosition: -10 }
            }
        }
    },
    {
        id: 7,
        week: 15,
        stakeholder: {
            name: "Jonas Reiter",
            role: "Lead Designer",
            quote: "The new swipe gesture tests 30% faster with new users. But our subreddit is on fire. Power users are posting about their 'ruined muscle memory.' One post has 2,000 upvotes: 'You fixed what wasn't broken.'"
        },
        choices: {
            A: {
                id: 'A',
                title: "Roll it back",
                description: "Trust your power users. They're your real moat.",
                effect: { satisfaction: 10, revenue: -5, technicalHealth: -5, marketPosition: -5 }
            },
            B: {
                id: 'B',
                title: "Add a toggle",
                description: "'Classic mode' as a compromise. Options are good.",
                effect: { satisfaction: 5, revenue: 0, technicalHealth: -10, marketPosition: 5 }
            },
            C: {
                id: 'C',
                title: "Hold the line",
                description: "New users are the future. Power users will adapt.",
                effect: { satisfaction: -15, revenue: 10, technicalHealth: 5, marketPosition: 10 }
            }
        }
    },
    {
        id: 8,
        week: 17,
        stakeholder: {
            name: "Elena Vasquez",
            role: "Senior iOS Engineer",
            quote: "I have an offer from Apple. I love what we're building, but I've been here through the duct tape phase. I need to know we're going to invest in doing things right—not just shipping fast forever."
        },
        choices: {
            A: {
                id: 'A',
                title: "Commit to excellence",
                description: "Promote her. One 'tech health' sprint per quarter. Put it in writing.",
                effect: { satisfaction: 0, revenue: -5, technicalHealth: 15, marketPosition: 0 }
            },
            B: {
                id: 'B',
                title: "Counter with equity",
                description: "Retention bonus. Promise it gets better after Series A.",
                effect: { satisfaction: 0, revenue: 0, technicalHealth: -5, marketPosition: 0 }
            },
            C: {
                id: 'C',
                title: "Let her go",
                description: "No one should be a single point of failure. Backfill.",
                effect: { satisfaction: -5, revenue: 5, technicalHealth: -15, marketPosition: -5 },
                triggerFlag: 'NO_TECHNICAL_LEADER'
            }
        }
    },
    {
        id: 9,
        week: 19,
        stakeholder: {
            name: "Sarah Chen",
            role: "CEO / Founder",
            quote: "Two days before our Series A pitch. A fitness company made an unsolicited offer—$40M. Not life-changing, but real. Our metrics are solid, not exceptional. I need to know what you think."
        },
        choices: {
            A: {
                id: 'A',
                title: "Take the exit",
                description: "A win is a win. Live to build again.",
                effect: { satisfaction: 0, revenue: 0, technicalHealth: 0, marketPosition: 0 } // Metric change irrelevant, handled specially
            },
            B: {
                id: 'B',
                title: "Raise the round",
                description: "We didn't come this far to sell the beginning of the story.",
                effect: { satisfaction: 0, revenue: 0, technicalHealth: 0, marketPosition: 0 } // Metric change irrelevant, handled specially
            },
            C: {
                id: 'C',
                title: "Counter with partnership",
                description: "Strategic partnership, not acquisition. Keep independence, gain distribution.",
                effect: { satisfaction: 5, revenue: 10, technicalHealth: -5, marketPosition: 15 } // Apply before ending check
            }
        }
    }
];
