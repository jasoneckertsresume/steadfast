import { useState, useEffect } from 'react';

export function TearLines({ tier }: { tier: number }) {
    const [tears, setTears] = useState<{ top: number; offset: number; id: number }[]>([]);

    useEffect(() => {
        if (tier < 3) {
            setTears([]);
            return;
        }

        const interval = setInterval(() => {
            if (Math.random() < tier * 0.1) {
                const newTear = {
                    top: Math.random() * 100,
                    offset: (Math.random() - 0.5) * 20,
                    id: Math.random()
                };
                setTears(prev => [...prev.slice(-3), newTear]);

                // Remove after animation (approx)
                setTimeout(() => {
                    setTears(prev => prev.filter(t => t.id !== newTear.id));
                }, 150);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [tier]);

    return (
        <div className="tear-container" aria-hidden="true">
            {tears.map((tear) => (
                <div
                    key={tear.id}
                    className="tear-line"
                    style={{
                        top: `${tear.top}%`,
                        transform: `translateX(${tear.offset}px)`
                    }}
                />
            ))}
        </div>
    );
}
