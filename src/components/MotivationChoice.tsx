import { useState } from 'react';
import type { PlayerMotivation } from '../types';

const motivations = [
    {
        id: 'HELP_PEOPLE',
        title: 'TO BUILD SOMETHING THAT HELPS PEOPLE',
        quote: "I've worked on products that optimized for metrics. I want to optimize for lives."
    },
    {
        id: 'PROVE_MYSELF',
        title: 'TO PROVE I CAN BUILD SOMETHING FROM NOTHING',
        quote: "I want to know if I have what it takes to take something from zero to one."
    },
    {
        id: 'BUILD_TO_LAST',
        title: 'TO BUILD SOMETHING THAT LASTS',
        quote: "I'm tired of startups that burn bright and flame out. I want to build for the long term."
    }
];

export function MotivationChoice({
    onSelect
}: {
    onSelect: (motivation: PlayerMotivation) => void
}) {
    const [selected, setSelected] = useState<PlayerMotivation | null>(null);

    const handleSelect = (motivation: PlayerMotivation) => {
        if (selected) return; // Prevent double clicks
        setSelected(motivation);
        // Add small delay for visual feedback before transitioning
        setTimeout(() => onSelect(motivation), 800);
    };

    return (
        <div className="motivation-screen flex flex-col items-center justify-center min-h-screen p-4 animate-in fade-in duration-1000">
            <h2 className="text-text-muted text-xl mb-12 font-mono tracking-wide">
                Why did you take this job?
            </h2>

            <div className="motivation-cards flex flex-col gap-4 max-w-xl w-full">
                {motivations.map(m => (
                    <button
                        key={m.id}
                        onClick={() => handleSelect(m.id as PlayerMotivation)}
                        className={`
              w-full text-left p-8 rounded border transition-all duration-500 relative overflow-hidden group
              ${selected === m.id
                                ? 'bg-accent-cyan/10 border-accent-cyan shadow-[0_0_30px_rgba(0,240,255,0.2)] scale-105 z-10'
                                : selected
                                    ? 'opacity-30 border-white/10 blur-[2px] scale-95'
                                    : 'bg-bg-card border-white/10 hover:border-accent-cyan/50 hover:-translate-y-1'
                            }
            `}
                    >
                        <h3 className={`font-bold text-lg mb-3 font-mono tracking-wider transition-colors ${selected === m.id ? 'text-accent-cyan' : 'text-white'}`}>
                            {m.title}
                        </h3>
                        <p className={`text-text-muted italic font-light transition-colors ${selected === m.id ? 'text-white' : ''}`}>
                            "{m.quote}"
                        </p>

                        {/* Hover glow effect for unselected items */}
                        {!selected && (
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/0 via-accent-cyan/5 to-accent-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
