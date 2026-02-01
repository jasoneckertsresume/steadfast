import React from 'react';
import type { Metrics } from '../types';
import { Card } from './ui/Card';

interface MetricsPanelProps {
    metrics: Metrics;
}

const ProgressBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
    <div className="flex items-center gap-3 font-mono text-sm metric-bar" data-critical={value < 30}>
        <span className="w-20 text-text-muted font-bold truncate metric-label">{label}</span>
        <div className="flex-1 h-3 bg-bg-card-elevated rounded-none overflow-hidden relative">
            {/* Background segments for retro feel */}
            <div className="absolute inset-0 flex">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex-1 border-r border-bg-primary/50 last:border-0" />
                ))}
            </div>
            <div
                className={`h-full ${colorClass} transition-all duration-500 ease-out metric-bar-fill`}
                style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
            />
        </div>
        <span className="w-8 text-right text-white font-bold">{Math.round(value)}</span>
    </div>
);

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
    return (
        <Card className="mb-6 border-cyan-500/30">
            <div className="text-xs font-mono text-text-muted mb-4 tracking-widest uppercase border-b border-white/5 pb-2">Metrics</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <ProgressBar label="CUST SAT" value={metrics.satisfaction} colorClass="bg-accent-cyan" />
                <ProgressBar label="REV" value={metrics.revenue} colorClass="bg-accent-green" />
                <ProgressBar label="TECH" value={metrics.technicalHealth} colorClass="bg-accent-yellow" />
                <ProgressBar label="MKT" value={metrics.marketPosition} colorClass="bg-accent-magenta" />
            </div>
        </Card>
    );
};
