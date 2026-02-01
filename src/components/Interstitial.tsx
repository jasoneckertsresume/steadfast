import React, { useState, useEffect } from 'react';
import { interstitials } from '../data/narrative';

interface InterstitialProps {
    decisionJustCompleted: number;
    onContinue: () => void;
}

export const Interstitial: React.FC<InterstitialProps> = ({
    decisionJustCompleted,
    onContinue
}) => {
    const content = interstitials[decisionJustCompleted];
    const [visibleLines, setVisibleLines] = useState(0);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // If no content found (shouldn't happen if logic is correct), just continue
        if (!content) return;

        // Reset state when content changes
        setVisibleLines(0);
        setShowButton(false);

        // Reveal lines one by one
        const lineTimer = setInterval(() => {
            setVisibleLines(v => {
                if (v >= content.lines.length) {
                    clearInterval(lineTimer);
                    return v;
                }
                return v + 1;
            });
        }, 1500); // 1.5s per line for slower pacing

        return () => clearInterval(lineTimer);
    }, [content]);

    useEffect(() => {
        if (content && visibleLines >= content.lines.length) {
            const btnTimer = setTimeout(() => setShowButton(true), 2000); // Wait 2s after last line
            return () => clearTimeout(btnTimer);
        }
    }, [visibleLines, content]);

    if (!content) return null;

    return (
        <div className="interstitial-screen flex flex-col items-center justify-center min-h-screen p-8 text-center max-w-lg mx-auto">
            <div className="mb-12 font-mono text-text-muted text-sm tracking-widest uppercase animate-in fade-in duration-1000">
                Week {content.week}.
            </div>

            <div className="interstitial-content flex flex-col gap-8">
                {content.lines.map((line, i) => (
                    <p
                        key={i}
                        className={`text-text-primary text-lg leading-relaxed transition-all duration-1000 transform ${i < visibleLines ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                        {line}
                    </p>
                ))}
            </div>

            <div className={`mt-16 transition-opacity duration-1000 ${showButton ? 'opacity-100' : 'opacity-0'}`}>
                <button
                    onClick={onContinue}
                    className="px-8 py-3 bg-transparent border border-white/20 text-text-muted hover:text-white hover:border-white/50 transition-all font-mono text-sm tracking-widest uppercase"
                >
                    [ CONTINUE ]
                </button>
            </div>
        </div>
    );
};
