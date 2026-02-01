import type { Metrics } from '../types';

export function calculateHealthScore(metrics: Metrics): number {
    return Math.round(
        (metrics.satisfaction + metrics.revenue +
            metrics.technicalHealth + metrics.marketPosition) / 4
    );
}

export function getGlitchTier(healthScore: number): 1 | 2 | 3 | 4 | 5 {
    if (healthScore >= 80) return 1;
    if (healthScore >= 60) return 2;
    if (healthScore >= 40) return 3;
    if (healthScore >= 20) return 4;
    return 5;
}
