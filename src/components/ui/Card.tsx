import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style, ...props }) => {
    return (
        <div
            style={{ backgroundColor: '#0d1117', ...style }}
            className={`border border-cyan-500/20 rounded-lg p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
