import { useState, useEffect, useCallback } from 'react';

export function useTextScramble(text: string, tier: number): string {
    const [displayText, setDisplayText] = useState(text);
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

    useEffect(() => {
        // Reset if text changes
        setDisplayText(text);
    }, [text]);

    useEffect(() => {
        if (tier < 3) {
            setDisplayText(text);
            return;
        }

        const scrambleChance = tier * 0.05;

        const interval = setInterval(() => {
            if (Math.random() < scrambleChance) {
                // Scramble a few characters
                const scrambled = text.split('').map(char => {
                    if (char === ' ' || Math.random() > 0.2) return char;
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');

                setDisplayText(scrambled);

                // Restore after brief moment
                setTimeout(() => setDisplayText(text), 100);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [text, tier]);

    return displayText;
}

export function useDecisionGlitch() {
    const [isBursting, setIsBursting] = useState(false);

    const triggerBurst = useCallback(() => {
        setIsBursting(true);
        setTimeout(() => setIsBursting(false), 400);
    }, []);

    return { isBursting, triggerBurst };
}

export function useReducedMotion() {
    const [reduced, setReduced] = useState(() => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem('steadfast_reduced_motion') === 'true';
    });

    const toggle = () => {
        const newValue = !reduced;
        setReduced(newValue);
        localStorage.setItem('steadfast_reduced_motion', String(newValue));
    };

    return { reduced, toggle };
}
