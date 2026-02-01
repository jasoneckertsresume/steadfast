import { useState } from 'react';
import { initialMetrics } from '../types';
import type { GameState, Choice, PlayerMotivation } from '../types';
import { shouldShowInterstitial } from '../data/narrative';
import { calculateAlignmentScore } from '../data/alignment';
import { saveRun } from '../data/postmortem';

import { endings } from '../data/endings';

export function useGameState() {
    const [state, setState] = useState<GameState>({
        phase: 'landing',
        currentDecisionIndex: 0,
        metrics: { ...initialMetrics },
        decisionsMade: [],
        lastChoice: null,
        flags: new Set(),
        motivation: null,
        gameOver: false,
        ending: null,
        postmortemDecision: null
    });

    const clamp = (val: number) => Math.max(0, Math.min(100, val));

    const determineEnding = (tempState: GameState): string => {
        const { metrics, decisionsMade } = tempState;
        const avg = (metrics.satisfaction + metrics.revenue +
            metrics.technicalHealth + metrics.marketPosition) / 4;

        // Immediate failure conditions
        if (metrics.technicalHealth <= 0) return 'SYSTEM_COLLAPSE';
        if (metrics.satisfaction <= 0) return 'TOXIC_GROWTH';
        if (metrics.revenue <= 0) return 'BELOVED_FAILURE';

        // Extreme state endings
        if (metrics.revenue >= 80 && metrics.satisfaction <= 25) return 'TOXIC_GROWTH';
        if (metrics.satisfaction >= 80 && metrics.revenue <= 25) return 'BELOVED_FAILURE';

        // Decision 10 specific checks (index 9)
        const d10Choice = decisionsMade[9];
        // If we are evaluating this right after D10, d10Choice is the one just made.
        if (d10Choice === 'A') return 'SOFT_LANDING';
        if (d10Choice === 'C') return 'STRATEGIC_PLAY';

        // Metric-based endings (Default/Choice B logic)
        if (avg >= 70) return 'SUSTAINABLE_SUCCESS';
        if (avg >= 40) return 'GRINDING_FORWARD';
        return 'PYRRHIC_VICTORY';
    };

    const handleDecision = (choice: Choice) => {
        setState(prev => {
            // Apply Effects
            const newMetrics = {
                satisfaction: clamp(prev.metrics.satisfaction + choice.effect.satisfaction),
                revenue: clamp(prev.metrics.revenue + choice.effect.revenue),
                technicalHealth: clamp(prev.metrics.technicalHealth + choice.effect.technicalHealth),
                marketPosition: clamp(prev.metrics.marketPosition + choice.effect.marketPosition)
            };

            const newDecisionsMade = [...prev.decisionsMade, choice.id];

            // Add flag if exists
            const newFlags = new Set(prev.flags);
            if (choice.triggerFlag) {
                newFlags.add(choice.triggerFlag);
            }

            // Temporary state to check endings against
            const tempStateForCheck: GameState = {
                ...prev, // Copy previous state
                metrics: newMetrics, // Use NEW metrics
                decisionsMade: newDecisionsMade, // Use NEW decisions
                lastChoice: choice.id,
                flags: newFlags,
                // These fields are required by GameState but not used by determineEnding
                phase: 'playing',
                currentDecisionIndex: prev.currentDecisionIndex,
                gameOver: false,
                ending: null
            };




            // Check for immediate game over (0 metric) or specialized conditions
            const values = Object.values(newMetrics);
            if (values.some(v => v <= 0)) {
                const endingKey = determineEnding(tempStateForCheck);

                const decisionsForAlignment = [...newDecisionsMade];
                const alignmentScore = prev.motivation
                    ? calculateAlignmentScore(prev.motivation, decisionsForAlignment as any)
                    : 0;

                const finalState = {
                    ...prev,
                    metrics: newMetrics,
                    decisionsMade: newDecisionsMade,
                    lastChoice: choice.id,
                    flags: newFlags,
                    phase: 'ending' as const,
                    gameOver: true,
                    ending: endings[endingKey],
                    alignmentScore
                };

                // Save run
                try {
                    saveRun(finalState);
                } catch (e) {
                    console.error("Failed to save run", e);
                }

                return finalState;
            }

            // Check if game finished (reached end of defined decisions)
            if (prev.currentDecisionIndex >= 9) {
                const endingKey = determineEnding(tempStateForCheck);

                const decisionsForAlignment = [...newDecisionsMade];
                const alignmentScore = prev.motivation
                    ? calculateAlignmentScore(prev.motivation, decisionsForAlignment as any)
                    : 0;

                const finalState = {
                    ...prev,
                    metrics: newMetrics,
                    decisionsMade: newDecisionsMade,
                    lastChoice: choice.id,
                    flags: newFlags,
                    phase: 'ending' as const,
                    gameOver: true,
                    ending: endings[endingKey],
                    currentDecisionIndex: prev.currentDecisionIndex,
                    alignmentScore
                };

                // Save run
                try {
                    saveRun(finalState);
                } catch (e) {
                    console.error("Failed to save run", e);
                }

                return finalState;
            }

            // Check for interstitial
            if (shouldShowInterstitial()) {
                return {
                    ...prev,
                    metrics: newMetrics,
                    decisionsMade: newDecisionsMade,
                    flags: newFlags,
                    phase: 'interstitial',
                    // Don't advance index yet, we want to know WHICH decision just finished
                    currentDecisionIndex: prev.currentDecisionIndex
                };
            }

            return {
                ...prev,
                metrics: newMetrics,
                decisionsMade: newDecisionsMade,
                lastChoice: choice.id,
                flags: newFlags,
                currentDecisionIndex: prev.currentDecisionIndex + 1
            };
        });
    };

    const handleInterstitialContinue = () => {
        setState(prev => ({
            ...prev,
            phase: 'playing',
            currentDecisionIndex: prev.currentDecisionIndex + 1
        }));
    };

    const restart = () => {
        setState({
            phase: 'opening-motivation', // Skip context on replay
            currentDecisionIndex: 0,
            metrics: { ...initialMetrics },
            decisionsMade: [],
            lastChoice: null,
            flags: new Set(),
            motivation: null,
            gameOver: false,
            ending: null,
            postmortemDecision: null
        });
    };

    const setPhase = (phase: GameState['phase']) => {
        setState(prev => ({ ...prev, phase }));
    };

    const setMotivation = (motivation: PlayerMotivation) => {
        setState(prev => ({ ...prev, motivation }));
    };

    const setPostMortemPhase = (phase: 'postmortem-timeline' | 'postmortem-detail' | 'postmortem-counterfactual') => {
        setState(prev => ({ ...prev, phase }));
    };

    const setPostMortemDecision = (decisionId: number | null) => {
        setState(prev => ({ ...prev, postmortemDecision: decisionId }));
    };

    return { state, handleDecision, handleInterstitialContinue, restart, setPhase, setMotivation, setPostMortemPhase, setPostMortemDecision };
}
