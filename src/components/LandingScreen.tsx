import { useState, useEffect } from 'react';

export function LandingScreen({ onStart }: { onStart: () => void }) {
    const [glitchIntensity, setGlitchIntensity] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.95) {
                setGlitchIntensity(1);
                setTimeout(() => setGlitchIntensity(0), 100);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="landing-screen flex flex-col items-center justify-center min-h-screen relative overflow-hidden p-8">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-magenta/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            {/* Consolidated Card */}
            <div className="relative z-10 flex flex-col max-w-4xl mx-auto w-full backdrop-blur-sm bg-bg-card/40 border border-white/5 rounded-2xl shadow-2xl overflow-hidden md:flex-row transition-all duration-500 hover:border-accent-cyan/20">

                {/* Left Side: Title & Branding */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 bg-black/20">
                    <div className="mb-4">
                        <span className="text-xs font-mono tracking-[0.5em] text-accent-cyan uppercase opacity-80">
                            Simulation v1.0.4
                        </span>
                    </div>

                    <h1
                        className={`text-5xl md:text-6xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-text-primary to-text-muted ${glitchIntensity ? 'translate-x-1 skew-x-12 opacity-80' : ''}`}
                        style={{ textShadow: glitchIntensity ? '2px 0 #00f0ff, -2px 0 #ff0080' : 'none' }}
                    >
                        STEADFAST
                    </h1>

                    <p className="text-lg font-mono text-text-muted tracking-wide mb-8">
                        FOUNDER MODE SIMULATOR
                    </p>

                    <div className="hidden md:block">
                        <div className="text-xs text-white/10 font-mono tracking-widest mt-auto">
                            SYSTEM READY
                        </div>
                    </div>
                </div>

                {/* Right Side: Role & Launch */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-white/5">
                    <div className="space-y-6 font-mono text-sm leading-relaxed text-text-muted">
                        <p className="text-lg text-white font-bold">
                            ROLE: LEAD PRODUCT MANAGER
                        </p>

                        <p>
                            You are the first PM hire at Steadfast.
                            50,000 users. Seed funding. A founder who hasn't slept in three years.
                        </p>
                        <p>
                            Your desk is a folding table. You have one goal:
                        </p>
                        <p className="text-accent-cyan text-lg font-bold border-l-2 border-accent-cyan pl-4 py-1 italic bg-accent-cyan/5">
                            "MAKE SOMETHING PEOPLE WANT."
                        </p>
                        <p>
                            20 weeks until Series A.
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <button
                            onClick={onStart}
                            className="group relative w-full px-8 py-4 bg-accent-cyan/10 border border-accent-cyan/50 text-accent-cyan font-mono font-bold tracking-widest uppercase hover:bg-accent-cyan/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors">INITIALIZE_SEQUENCE</span>
                            <div className="absolute inset-0 bg-accent-cyan transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
