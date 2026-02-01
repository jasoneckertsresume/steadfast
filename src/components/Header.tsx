import React from 'react';

interface HeaderProps {
    week: number;
    decisionNumber: number;
    totalDecisions: number;
}

export const Header: React.FC<HeaderProps> = ({ week, decisionNumber, totalDecisions }) => {
    return (
        <header className="flex justify-between items-center py-6 mb-2">
            <div className="font-mono text-2xl font-bold tracking-wider glitch-text text-white">
                STEADFAST
            </div>
            <div className="flex gap-6 font-mono text-sm text-text-muted">
                <span>Week {week} of 20</span>
                <span>{decisionNumber}/{totalDecisions}</span>
            </div>
        </header>
    );
};
