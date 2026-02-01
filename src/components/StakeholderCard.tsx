import React from 'react';
import { User } from 'lucide-react';
import { Card } from './ui/Card';

interface StakeholderCardProps {
    name: string;
    role: string;
    quote: string;
    avatar?: string;
}

export const StakeholderCard: React.FC<StakeholderCardProps> = ({ name, role, quote }) => {
    return (
        <Card className="mb-8 border-l-4 border-l-white/20 hover:border-l-accent-cyan/50 transition-colors">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex items-center gap-4 min-w-max">
                    <div className="w-12 h-12 rounded-full bg-bg-card-elevated flex items-center justify-center border border-white/10 shrink-0">
                        <User className="text-text-muted w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-white font-bold font-mono text-lg">{name}</div>
                        <div className="text-text-muted text-sm font-mono">{role}</div>
                    </div>
                </div>
                <div className="flex-1 pt-1">
                    <blockquote className="text-xl italic text-white/90 leading-relaxed font-light pl-4 md:pl-6 border-l-2 md:border-l-2 border-accent-cyan/30">
                        "{quote}"
                    </blockquote>
                </div>
            </div>
        </Card>
    );
};
