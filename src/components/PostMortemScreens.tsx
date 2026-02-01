import React, { useMemo } from 'react';
import type { GameState, DecisionChoice, ConsequenceFlag } from '../types';
import { decisionSummaries, flagDescriptions, flagConsequences, calculatePhilosophy, analyzeEndings } from '../data/postmortem';

// --- Shared Components ---

function NavButton({ label, onClick, disabled = false, primary = false }: { label: string; onClick: () => void; disabled?: boolean; primary?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`nav-btn ${primary ? 'border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10' : ''}`}
        >
            {label}
        </button>
    );
}

// --- Screen 1: Timeline View ---

interface TimelineNode {
    decision: number;
    choice: DecisionChoice;
    isInflection: boolean;
    flagSet: ConsequenceFlag | null;
}

const PostMortemTimeline: React.FC<{
    gameState: GameState;
    onNodeClick: (id: number) => void;
    onViewCounterfactual: () => void;
    onPlayAgain: () => void;
}> = ({ gameState, onNodeClick, onViewCounterfactual, onPlayAgain }) => {

    const nodes: TimelineNode[] = useMemo(() => {
        return gameState.decisionsMade.map((choice, i) => {
            if (!choice) return null;

            const summary = decisionSummaries.find(d => d.id === i + 1);
            const choiceDetails = summary?.choices.find(c => c.id === choice);

            // Determine inflection (simple logic for now: > 20 point swing in any metric)
            const effects = choiceDetails?.impacts || { sat: 0, rev: 0, tech: 0, mkt: 0 };
            const totalImpact = Math.abs(effects.sat) + Math.abs(effects.rev) + Math.abs(effects.tech) + Math.abs(effects.mkt);
            const isInflection = totalImpact > 25;

            return {
                decision: i + 1,
                choice: choice,
                isInflection,
                flagSet: choiceDetails?.flag || null
            };
        }).filter((n): n is TimelineNode => n !== null);
    }, [gameState.decisionsMade]);

    const philosophy = calculatePhilosophy(gameState.flags);

    return (
        <div className="postmortem-screen animate-in fade-in duration-700">
            <div className="text-center mb-8">
                <h2 className="text-xl text-white font-mono mb-2">DEBRIEF: {gameState.ending?.title}</h2>
                <p className="text-text-muted italic">"{gameState.ending?.tagline}"</p>
            </div>

            <div className="timeline-container relative my-12">
                <div className="timeline-track flex items-center justify-center">
                    {nodes.map((node, i) => (
                        <React.Fragment key={node.decision}>
                            {i > 0 && <div className="timeline-connector w-8 h-0.5 bg-accent-cyan/30" />}
                            <button
                                onClick={() => onNodeClick(node.decision)}
                                className={`timeline-node relative w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
                            ${node.isInflection ? 'border-accent-yellow text-accent-yellow' : 'border-accent-cyan/50 text-accent-cyan bg-bg-card'}
                            hover:scale-110 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]
                        `}
                            >
                                {node.isInflection ? '◆' : '●'}
                                <span className="node-number absolute -bottom-6 text-xs text-text-muted font-mono">{node.decision}</span>
                                {node.flagSet && <span className="flag-marker absolute -top-6 text-accent-magenta text-xs">▲</span>}
                            </button>
                        </React.Fragment>
                    ))}
                </div>

                <div className="timeline-legend flex justify-center gap-6 mt-8 text-xs text-text-muted font-mono">
                    <span className="flex items-center gap-2"><span className="text-accent-cyan">●</span> Decision</span>
                    <span className="flex items-center gap-2"><span className="text-accent-yellow">◆</span> Inflection (&gt;25pt swing)</span>
                    <span className="flex items-center gap-2"><span className="text-accent-magenta">▲</span> Flag set</span>
                </div>
            </div>

            <div className="border-t border-white/10 my-8" />

            <div className="flags-section grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-sm font-mono text-text-muted tracking-widest mb-4">FLAGS ACCUMULATED</h3>
                    {gameState.flags.size === 0 ? (
                        <p className="text-text-muted italic text-sm">No major red flags triggered.</p>
                    ) : (
                        <div className="flags-list space-y-3">
                            {Array.from(gameState.flags).map(flag => (
                                <div key={flag} className="flag-item p-3 bg-accent-magenta/5 border-l-2 border-accent-magenta">
                                    <div className="text-xs font-mono text-accent-magenta mb-1">{flagDescriptions[flag].title}</div>
                                    <div className="text-sm text-text-muted">{flagDescriptions[flag].summary}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-sm font-mono text-text-muted tracking-widest mb-4">PHILOSOPHY</h3>
                    <div className="p-4 bg-bg-card border border-white/10">
                        <div className="text-lg text-accent-cyan font-bold mb-2">{philosophy.label}</div>
                        <p className="text-sm text-text-muted">{philosophy.description}</p>
                    </div>
                </div>
            </div>

            <div className="postmortem-nav mt-12 flex justify-between">
                <NavButton label="WHAT COULD HAVE BEEN" onClick={onViewCounterfactual} />
                <NavButton label="PLAY AGAIN" onClick={onPlayAgain} primary />
            </div>
        </div>
    );
};

// --- Screen 2: Decision Detail ---

const PostMortemDetail: React.FC<{
    decisionId: number | null;
    gameState: GameState;
    onBack: () => void;
    onPrev: () => void;
    onNext: () => void;
}> = ({ decisionId, gameState, onBack, onPrev, onNext }) => {
    if (!decisionId) return null;

    const summary = decisionSummaries.find(d => d.id === decisionId);
    if (!summary) return null;

    const choiceId = gameState.decisionsMade[decisionId - 1] as 'A' | 'B' | 'C';
    const choice = summary.choices.find(c => c.id === choiceId);
    if (!choice) return null;

    const flagSet = choice.flag;
    const consequence = flagSet ? flagConsequences[flagSet] : null;

    // Calculate generic "road not taken" text based on counterfactuals
    const roadNotTaken = Object.entries(summary.counterfactual)
        .filter(([key]) => key !== choiceId && summary.choices.find(c => c.id === key)) // Only show valid other choices
        .map(([key, points]) => ({
            key,
            points
        }));

    return (
        <div className="postmortem-screen animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="header mb-6">
                <div className="text-xs font-mono text-text-muted mb-1">DECISION {decisionId} • WEEK {summary.week}</div>
                <h2 className="text-2xl text-white font-bold">{summary.title}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="context">
                    <h3 className="text-sm font-mono text-text-muted tracking-widest mb-2 border-b border-white/10 pb-1">THE QUESTION</h3>
                    <p className="text-text-primary mb-1">{summary.questionSummary}</p>
                    <p className="text-sm text-text-muted italic">Stakeholder: {summary.stakeholder}</p>
                </div>

                <div className="choice">
                    <h3 className="text-sm font-mono text-text-muted tracking-widest mb-2 border-b border-white/10 pb-1">YOUR CHOICE</h3>
                    <p className="text-accent-cyan font-bold mb-1">"{choice.title}"</p>
                    <p className="text-sm text-text-muted">{choice.description}</p>
                </div>
            </div>

            <div className="impacts mb-8 text-sm">
                <h3 className="text-sm font-mono text-text-muted tracking-widest mb-4 border-b border-white/10 pb-1">IMPACT</h3>
                {['sat', 'rev', 'tech', 'mkt'].map(metric => {
                    const val = choice.impacts[metric as keyof typeof choice.impacts];
                    return (
                        <div key={metric} className="flex items-center gap-4 mb-2 font-mono">
                            <span className="w-10 uppercase text-text-muted">{metric}</span>
                            <div className={`w-12 text-right ${val > 0 ? 'text-accent-green' : val < 0 ? 'text-accent-magenta' : 'text-text-muted'}`}>
                                {val > 0 ? '+' : ''}{val}
                            </div>
                            <div className="flex-1 h-1 bg-bg-card relative">
                                <div
                                    className={`absolute h-full ${val > 0 ? 'bg-accent-green' : 'bg-accent-magenta'}`}
                                    style={{ width: `${Math.min(Math.abs(val) * 2, 100)}%` }} // Visual scale
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            {flagSet && (
                <div className="flag-alert p-4 bg-accent-magenta/10 border border-accent-magenta mb-8">
                    <div className="text-accent-magenta font-mono font-bold mb-1">⚑ FLAG SET: {flagSet}</div>
                    <p className="text-sm text-text-primary">{flagDescriptions[flagSet].summary}</p>
                    {consequence && (
                        <p className="text-xs text-text-muted mt-2 italic border-t border-accent-magenta/30 pt-2">
                            Consequence: {consequence.explanation}
                        </p>
                    )}
                </div>
            )}

            <div className="counterfactuals bg-bg-card p-6 border border-white/5">
                <h3 className="text-sm font-mono text-text-muted tracking-widest mb-4">THE ROAD NOT TAKEN</h3>
                <div className="space-y-4">
                    {roadNotTaken.map(({ key, points }) => (
                        <div key={key}>
                            <div className="text-xs font-mono text-text-muted mb-1">IF YOU CHOSE {key}:</div>
                            <ul className="list-disc list-inside text-sm text-text-primary space-y-1">
                                {points.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="postmortem-nav mt-8 flex justify-between items-center">
                <NavButton label="← PREV" onClick={onPrev} disabled={decisionId <= 1} />
                <NavButton label="BACK TO TIMELINE" onClick={onBack} />
                <NavButton label="NEXT →" onClick={onNext} disabled={decisionId >= gameState.decisionsMade.length} />
            </div>
        </div>
    );
};

// --- Screen 3: What Could Have Been ---

const PostMortemCounterfactual: React.FC<{
    gameState: GameState;
    onBack: () => void;
    onPlayAgain: () => void;
}> = ({ gameState, onBack, onPlayAgain }) => {
    const analyses = useMemo(() => analyzeEndings(gameState), [gameState]);

    return (
        <div className="postmortem-screen animate-in fade-in duration-700">
            <div className="text-center mb-10">
                <h2 className="text-2xl text-white font-mono mb-2">WHAT COULD HAVE BEEN</h2>
                <p className="text-text-muted">You achieved: <span className="text-accent-cyan">{gameState.ending?.title}</span></p>
            </div>

            <div className="grid gap-6">
                {analyses.map((analysis: any) => (
                    <div key={analysis.ending} className="p-6 bg-bg-card border border-white/10 hover:border-accent-cyan/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-white">◈ {analysis.title}</h3>
                            <span className={`text-xs font-mono px-2 py-1 rounded ${analysis.status === 'blocked' ? 'bg-accent-magenta/20 text-accent-magenta' :
                                analysis.status === 'metrics' ? 'bg-accent-yellow/20 text-accent-yellow' :
                                    'bg-white/10 text-text-muted'
                                }`}>
                                {analysis.status === 'blocked' ? 'BLOCKED' : analysis.status === 'metrics' ? 'MISSED METRICS' : 'CHOICE PATH'}
                            </span>
                        </div>
                        <p className="text-sm text-text-muted italic mb-4">"{analysis.tagline}"</p>

                        <div className="mb-4 text-sm text-text-primary">
                            <span className="text-text-muted font-mono text-xs uppercase mr-2">Status:</span>
                            {analysis.explanation}
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <div className="text-xs font-mono text-text-muted mb-1">CLOSEST PATH:</div>
                            <p className="text-sm text-accent-cyan">{analysis.closestPath}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="postmortem-nav mt-12 flex justify-between">
                <NavButton label="BACK TO TIMELINE" onClick={onBack} />
                <NavButton label="PLAY AGAIN" onClick={onPlayAgain} primary />
            </div>
        </div>
    );
};

// --- Main Container ---

export const PostMortemManager: React.FC<{
    gameState: GameState;
    onSetPhase: (phase: any) => void;
    onSetDecision: (id: number | null) => void;
    onPlayAgain: () => void;
}> = ({ gameState, onSetPhase, onSetDecision, onPlayAgain }) => {

    // Auto-save run on mount if not saved? (Handled elsewhere or here)
    // For now, assume saved on completion.

    if (gameState.phase === 'postmortem-detail') {
        return (
            <PostMortemDetail
                decisionId={gameState.postmortemDecision}
                gameState={gameState}
                onBack={() => onSetPhase('postmortem-timeline')}
                onPrev={() => onSetDecision((gameState.postmortemDecision || 1) - 1)}
                onNext={() => onSetDecision((gameState.postmortemDecision || 1) + 1)}
            />
        );
    }

    if (gameState.phase === 'postmortem-counterfactual') {
        return (
            <PostMortemCounterfactual
                gameState={gameState}
                onBack={() => onSetPhase('postmortem-timeline')}
                onPlayAgain={onPlayAgain}
            />
        );
    }

    return (
        <PostMortemTimeline
            gameState={gameState}
            onNodeClick={(id) => {
                onSetDecision(id);
                onSetPhase('postmortem-detail');
            }}
            onViewCounterfactual={() => onSetPhase('postmortem-counterfactual')}
            onPlayAgain={onPlayAgain}
        />
    );
};
