import React from 'react';
import type { Decision, Choice, ConsequenceFlag, DecisionChoice, Metrics } from '../types';
import { internalMonologue } from '../data/narrative';
import { isChoiceBlocked } from '../data/blocking';
import { useDecisionGlitch } from '../hooks/useGlitch';

import { Header } from './Header';
import { MetricsPanel } from './MetricsPanel';
import { StakeholderCard } from './StakeholderCard';
import { DecisionCard } from './DecisionCard';
import { ArtifactsRow } from './ArtifactsRow';

interface DecisionScreenProps {
    decision: Decision;
    decisionNumber: number;
    totalDecisions: number;
    metrics: Metrics;
    flags: Set<ConsequenceFlag>;
    lastChoice: DecisionChoice | null;
    onDecision: (choice: Choice) => void;
}

export const DecisionScreen: React.FC<DecisionScreenProps> = ({
    decision,
    decisionNumber,
    totalDecisions,
    metrics,
    flags,
    lastChoice,
    onDecision
}) => {
    const showMonologue = true;
    const showCards = true;
    const monologue = internalMonologue[decision.id];

    const { isBursting, triggerBurst } = useDecisionGlitch();

    const handleDecisionClick = (choice: Choice) => {
        triggerBurst();
        onDecision(choice);
    };

    // Sequential display logic removed per user request
    /*
    useEffect(() => {
        setShowMonologue(false);
        setShowCards(false);

        const monologueTimer = setTimeout(() => setShowMonologue(true), 1200); // Wait for stakeholder card
        const cardsTimer = setTimeout(() => setShowCards(true), 3000); // Allow time to read monologue

        return () => {
            clearTimeout(monologueTimer);
            clearTimeout(cardsTimer);
        };
    }, [decision.id]);
    */

    return (
        <div className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${isBursting ? 'glitch-burst' : ''}`}>
            <Header
                week={decision.week}
                decisionNumber={decisionNumber}
                totalDecisions={totalDecisions}
            />

            <div className="mt-8">
                <ArtifactsRow
                    satisfaction={metrics.satisfaction}
                    metrics={metrics}
                    currentDecision={decision.id + 1}
                    lastChoice={lastChoice}
                />

                <MetricsPanel metrics={metrics} />

                <StakeholderCard
                    name={decision.stakeholder.name}
                    role={decision.stakeholder.role}
                    quote={decision.stakeholder.quote}
                />

                <div
                    className={`text-center max-w-2xl mx-auto my-8 font-serif italic text-text-muted text-lg transition-all duration-1000 transform ${showMonologue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    {monologue || ""}
                </div>

                <div
                    className={`grid gap-6 transition-all duration-1000 transform ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${Object.keys(decision.choices).length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}
                >
                    {(Object.entries(decision.choices) as [string, any][]).map(([key, choice]) => {
                        const blockedState = isChoiceBlocked(decision.id, choice.id, flags);
                        return (
                            <DecisionCard
                                key={key}
                                choice={choice}
                                isBlocked={!!blockedState}
                                blockMessage={blockedState?.message}
                                blockRequirement={blockedState?.requirement}
                                onClick={() => handleDecisionClick(choice)}
                                disabled={!showCards} // Prevent clicking before visible
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
