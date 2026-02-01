import { useGameState } from './hooks/useGameState';
import type { PlayerMotivation } from './types';
import { decisions } from './data/decisions';
import { EndingScreen } from './components/EndingScreen';

import { MotivationChoice } from './components/MotivationChoice';
import { Interstitial } from './components/Interstitial';
import { DecisionScreen } from './components/DecisionScreen';
import { PostMortemManager } from './components/PostMortemScreens';
import { GlitchManager } from './components/effects/GlitchManager';
import { calculateHealthScore } from './utils/glitch';
import { useReducedMotion } from './hooks/useGlitch';
import { LandingScreen } from './components/LandingScreen';

function App() {
  const {
    state,
    handleDecision,
    handleInterstitialContinue,
    restart,
    setPhase,
    setMotivation,
    setPostMortemPhase,
    setPostMortemDecision
  } = useGameState();
  const { reduced } = useReducedMotion();
  const currentDecision = decisions[state.currentDecisionIndex];

  // For the prototype, we end after available decisions (3), but display "/ 10" to match design specs.
  const displayTotalDecisions = 10;

  const healthScore = calculateHealthScore(state.metrics);

  const handleStartGame = () => {
    setPhase('opening-motivation');
  };

  const handleMotivationSelect = (motivation: PlayerMotivation) => {
    setMotivation(motivation);
    setPhase('playing');
  };

  const handleViewDebrief = () => {
    setPostMortemPhase('postmortem-timeline');
  };

  const content = (
    <div className={`min-h-screen text-text-primary px-4 py-8 grid-bg relative overflow-x-hidden font-sans selection:bg-accent-cyan/30 selection:text-white ${reduced ? 'reduced-motion' : ''}`}>
      {/* Scanlines overlay - Handled by GlitchManager, but can keep as fallback if reduced motion is off, or let GlitchManager handle purely. 
          Actually with GlitchManager, we don't need manual scanlines div here unless safe mode.
          But GlitchManager puts children below layers.
      */}

      <div className="max-w-4xl mx-auto relative z-10">
        {state.phase === 'landing' ? (
          <LandingScreen onStart={handleStartGame} />
        ) : state.phase === 'opening-motivation' ? (
          <MotivationChoice onSelect={handleMotivationSelect} />
        ) : state.phase === 'interstitial' ? (
          <Interstitial
            decisionJustCompleted={state.currentDecisionIndex}
            onContinue={handleInterstitialContinue}
          />
        ) : state.phase === 'ending' ? (
          <EndingScreen
            gameState={state}
            onRestart={restart}
            onViewDebrief={handleViewDebrief}
          />
        ) : state.phase.startsWith('postmortem') ? (
          <PostMortemManager
            gameState={state}
            onSetPhase={setPostMortemPhase}
            onSetDecision={setPostMortemDecision}
            onPlayAgain={restart}
          />
        ) : (
          currentDecision && (
            <DecisionScreen
              decision={currentDecision}
              decisionNumber={state.currentDecisionIndex + 1}
              totalDecisions={displayTotalDecisions}
              metrics={state.metrics}
              flags={state.flags}
              lastChoice={state.lastChoice}
              onDecision={handleDecision}
            />
          )
        )}
      </div>
    </div>
  );

  if (reduced) {
    return content;
  }

  return (
    <GlitchManager healthScore={healthScore}>
      {content}
    </GlitchManager>
  );
}

export default App;
