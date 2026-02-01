import React from 'react';
import { getGlitchTier } from '../../utils/glitch';
import { ScanLines, NoiseOverlay } from './Overlays';
import { TearLines } from './TearLines';
import { BlockDisplacement } from './BlockDisplacement';

interface GlitchManagerProps {
    healthScore: number;
    children: React.ReactNode;
}

export function GlitchManager({ healthScore, children }: GlitchManagerProps) {
    const tier = getGlitchTier(healthScore);

    return (
        <div
            className="glitch-container"
            data-glitch-tier={tier}
        >
            <div className="content-layer relative z-10 transition-opacity duration-100 flicker-container">
                {children}
            </div>

            {/* Glitch Effects Layers */}
            <ScanLines />
            <NoiseOverlay />
            <TearLines tier={tier} />
            <BlockDisplacement tier={tier} />
        </div>
    );
}
