import React from 'react';
import type { Metrics, DecisionChoice } from '../types';
import {
    calculateRating,
    displayRating,
    calculateConfidence,
    selectReview,
    getSarahQuote
} from '../data/feedback';

// --- Sub-components (could handle in separate files but kept here for cohesion as per plan)

function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <div className="star-rating">
            {Array(fullStars).fill('★').map((s, i) => (
                <span key={`full-${i}`} className="star full">{s}</span>
            ))}
            {hasHalf && <span className="star half">★</span>}
            {Array(emptyStars).fill('☆').map((s, i) => (
                <span key={`empty-${i}`} className="star empty">{s}</span>
            ))}
            <span className="rating-number">{rating.toFixed(1)}</span>
        </div>
    );
}

function AppStoreReview({
    rating,
    snippet
}: {
    rating: number;
    snippet: string;
}) {
    return (
        <div
            className="artifact-card review-card flex flex-col justify-center"
            style={{ backgroundColor: '#0d1117' }}
        >
            <StarRating rating={displayRating(rating)} />
            <p className="review-snippet">"{snippet}"</p>
        </div>
    );
}

function CEOSentiment({
    quote,
    confidence
}: {
    quote: string;
    confidence: number;
}) {
    // Determine visual states based on confidence
    let confidenceClass = '';
    let cardClass = '';

    if (confidence < 30) {
        confidenceClass = 'low';
        cardClass = 'worried';
    } else if (confidence > 70) {
        cardClass = 'confident';
    }

    return (
        <div
            className={`artifact-card ceo-card flex flex-col justify-between ${cardClass}`}
            style={{ backgroundColor: '#0d1117' }}
        >
            <div>
                <div className="ceo-label">SARAH:</div>
                <p className="ceo-quote">"{quote}"</p>
            </div>
            <div className="confidence-row mt-auto">
                <span className="confidence-label">CONFIDENCE</span>
                <div className="confidence-bar">
                    <div
                        className={`confidence-fill ${confidenceClass}`}
                        style={{ width: `${confidence}%` }}
                    />
                </div>
                <span className="confidence-value">{confidence}</span>
            </div>
        </div>
    );
}

// --- Main Container

interface ArtifactsRowProps {
    satisfaction: number;
    metrics: Metrics;
    currentDecision: number; // Index of UPCOMING decision (state.currentDecisionIndex)
    lastChoice: DecisionChoice | null;
}

export const ArtifactsRow: React.FC<ArtifactsRowProps> = ({
    satisfaction,
    metrics,
    currentDecision,
    lastChoice
}) => {
    const rating = calculateRating(satisfaction);
    const confidence = calculateConfidence(metrics);

    const reviewSnippet = selectReview(currentDecision, lastChoice, rating, satisfaction);
    const sarahQuote = getSarahQuote(currentDecision, lastChoice, confidence);

    return (
        <div className="artifacts-row animate-in fade-in slide-in-from-top-4 duration-700">
            <AppStoreReview rating={rating} snippet={reviewSnippet} />
            <CEOSentiment quote={sarahQuote} confidence={confidence} />
        </div>
    );
};
