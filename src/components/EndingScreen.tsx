import React, { useState, useEffect } from 'react';
import type { GameState } from '../types';
import { getAlignmentCategory, alignmentLabels, alignmentReflections, motivationTitles } from '../data/alignment';
import { getDecisionCallbacks } from '../data/endings';

interface EndingScreenProps {
    gameState: GameState;
    onRestart: () => void;
    onViewDebrief?: () => void;
}

function MetricBar({
    label,
    value,
    color
}: {
    label: string;
    value: number;
    color: 'cyan' | 'green' | 'yellow' | 'magenta';
}) {
    const colorMap = {
        cyan: '#00f0ff',
        green: '#3fb950',
        yellow: '#d29922',
        magenta: '#ff0080'
    };

    return (
        <div className="metric-bar-row">
            <span className="metric-label" style={{ color: colorMap[color] }}>
                {label}
            </span>
            <div className="metric-bar-track">
                <div
                    className="metric-bar-fill"
                    style={{
                        width: `${value}%`,
                        backgroundColor: colorMap[color]
                    }}
                />
            </div>
            <span className="metric-value">{Math.round(value)}</span>
        </div>
    );
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
    gameState,
    onRestart,
    onViewDebrief
}) => {
    const [showDebrief, setShowDebrief] = useState(false);

    const ending = gameState.ending;
    if (!ending) return null;

    // Calculate alignment derived values
    const score = gameState.alignmentScore ?? 0;
    const alignmentCategory = getAlignmentCategory(score);

    // Safe access for reflection
    const motivation = gameState.motivation || 'HELP_PEOPLE';
    const reflection = alignmentReflections[motivation][alignmentCategory];

    const callbacks = getDecisionCallbacks(gameState.flags);

    // Show "View Debrief" button after delay
    useEffect(() => {
        const timer = setTimeout(() => setShowDebrief(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="ending-screen animate-in fade-in zoom-in-95 duration-1000">
            {/* Title & Tagline */}
            <div className="ending-header">
                <h1 className="ending-title glitch-text text-4xl md:text-5xl mb-2">{ending.title}</h1>
                <p className="ending-tagline text-text-muted italic text-lg">"{ending.tagline}"</p>
            </div>

            <div className="ending-divider" />

            {/* Epilogue */}
            <div className="ending-epilogue mb-8">
                <p>{ending.epilogue}</p>
            </div>

            <div className="ending-divider" />

            {/* Final Metrics */}
            <div className="ending-section">
                <h2 className="section-label">FINAL STATE</h2>
                <div className="final-metrics">
                    <MetricBar label="SAT" value={gameState.metrics.satisfaction} color="cyan" />
                    <MetricBar label="REV" value={gameState.metrics.revenue} color="green" />
                    <MetricBar label="TECH" value={gameState.metrics.technicalHealth} color="yellow" />
                    <MetricBar label="MKT" value={gameState.metrics.marketPosition} color="magenta" />
                </div>
            </div>

            <div className="ending-divider" />

            {/* Motivation & Alignment */}
            <div className="ending-section">
                <h2 className="section-label">YOUR MOTIVATION</h2>
                <p className="motivation-text">"{motivationTitles[motivation]}"</p>

                <div className="alignment-block">
                    <span className="alignment-label">ALIGNMENT:</span>
                    <span className={`alignment-value ${alignmentCategory.toLowerCase()}`}>
                        {alignmentLabels[alignmentCategory]}
                    </span>
                </div>
                <p className="reflection-text">"{reflection}"</p>
            </div>

            <div className="ending-divider" />

            {/* Decision Callbacks */}
            <div className="ending-section">
                <h2 className="section-label">WHAT FOLLOWED YOU</h2>
                <ul className="callbacks-list mt-2">
                    {callbacks.map((callback, i) => (
                        <li key={i} className="callback-item">"{callback}"</li>
                    ))}
                </ul>
            </div>

            <div className="ending-divider" />

            {/* Actions */}
            <div className="ending-actions">
                {showDebrief && onViewDebrief && (
                    <button onClick={onViewDebrief} className="btn btn-secondary">
                        VIEW DEBRIEF
                    </button>
                )}
                <button onClick={onRestart} className="btn btn-primary">
                    PLAY AGAIN
                </button>
            </div>
        </div>
    );
};
