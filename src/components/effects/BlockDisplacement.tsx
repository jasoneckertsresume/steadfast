import { useState, useEffect } from 'react';

export function BlockDisplacement({ tier }: { tier: number }) {
    const [blocks, setBlocks] = useState<{
        top: number;
        left: number;
        width: number;
        height: number;
        offsetX: number;
        id: number;
    }[]>([]);

    useEffect(() => {
        if (tier < 3) {
            setBlocks([]);
            return;
        }

        const interval = setInterval(() => {
            if (Math.random() < tier * 0.1) {
                const newBlock = {
                    top: Math.random() * 80 + 10,
                    left: Math.random() * 60 + 20,
                    width: Math.random() * 20 + 10,
                    height: Math.random() * 5 + 2,
                    offsetX: (Math.random() - 0.5) * 30,
                    id: Math.random()
                };

                setBlocks(prev => [...prev.slice(-2), newBlock]);

                setTimeout(() => {
                    setBlocks(prev => prev.filter(b => b.id !== newBlock.id));
                }, 200);
            }
        }, 800);

        return () => clearInterval(interval);
    }, [tier]);

    return (
        <div className="block-displacement" aria-hidden="true">
            {blocks.map((block) => (
                <div
                    key={block.id}
                    className="displaced-block"
                    style={{
                        top: `${block.top}%`,
                        left: `${block.left}%`,
                        width: `${block.width}%`,
                        height: `${block.height}vh`,
                        transform: `translateX(${block.offsetX}px)`
                    }}
                />
            ))}
        </div>
    );
}
