import React, { useState } from 'react';
import type { Choice } from '../types';
import { Card } from './ui/Card';

interface DecisionCardProps {
    choice: Choice;
    onClick: () => void;
    disabled?: boolean;
    isBlocked?: boolean;
    blockMessage?: string;
    blockRequirement?: string;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({
    choice,
    onClick,
    disabled,
    isBlocked,
    blockMessage,
    blockRequirement
}) => {
    const { id, title, description } = choice;

    const [revealed, setRevealed] = useState(false);
    const [revealing, setRevealing] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        // If disabled logically (game over or something) but not blocked specific logic, return
        if (disabled && !isBlocked) return;

        if (isBlocked && !revealed) {
            setRevealing(true);
            setTimeout(() => {
                setRevealing(false);
                setRevealed(true);
            }, 500); // 500ms glitch duration matches CSS animation
        } else if (!isBlocked) {
            onClick();
        }
    };

    if (revealed) {
        return (
            <div
                style={{ backgroundColor: '#0d1117' }}
                className="border border-danger/30 rounded-lg p-6 h-full cursor-not-allowed blocked-card relative overflow-hidden group"
            >
                {/* Scanline overlay for blocked state */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

                <div className="text-danger font-mono text-sm mb-2 font-bold tracking-widest animate-pulse">PATH CLOSED</div>
                <p className="text-text-muted text-sm mb-4 leading-relaxed font-mono">{blockMessage}</p>
                <div className="text-xs text-text-muted/60 font-mono border-t border-white/5 pt-3">
                    <span className="uppercase tracking-wider text-[10px] mb-1 block">Required:</span>
                    {blockRequirement}
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={handleClick}
            disabled={disabled && !isBlocked}
            className={`w-full text-left group focus:outline-none h-full ${revealing ? 'block-reveal-animation' : ''}`}
        >
            <Card className="h-full transition-all duration-300 transform group-hover:-translate-y-1 group-hover:border-accent-cyan/50 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.05)] relative overflow-hidden flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-lg font-mono text-text-muted group-hover:border-accent-cyan group-hover:text-accent-cyan group-hover:bg-accent-cyan/10 transition-colors shrink-0">
                        {id}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">{title}</h3>
                        <p className="text-text-muted leading-relaxed group-hover:text-gray-300">{description}</p>
                    </div>
                </div>

                {/* Metric Impact Overlay - always present but faded, brightens on hover */}
                {/* Metric Impact Overlay - HIDDEN per user request */}
                {/* 
                <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                    {Object.entries(effect).map(([key, value]) => {
                        if (value === 0) return null;
                        const color = value > 0 ? 'text-accent-green' : 'text-danger';
                        const sign = value > 0 ? '+' : '';
                        return (
                            <span key={key} className={color}>
                                {metricLabels[key] || key} {sign}{value}
                            </span>
                        );
                    })}
                </div>
                */}
            </Card>
        </button>
    );
}
