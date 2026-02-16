import React from 'react';
import defaultImage from '../assets/default-image.png';
import { Show } from '../types/show';
import './ResultCard.css';

interface SearchResult {
    show: Show;
}

interface Props {
    item: SearchResult;
    onSelect: (show: Show) => void;
}

const ResultCard: React.FC<Props> = ({ item, onSelect }) => {
    const s = item.show;
    return (
        <div className="result-card result-card-clickable" onClick={() => onSelect(s)}>
            <div className="result-image-wrap">
                <img src={s.image?.medium || s.image?.original || defaultImage} alt={s.name} className="result-image" />
                <div className="result-overlay">
                    <div className="overlay-content">
                        {(s.genres || []).slice(0, 2).map(g => (
                            <div key={g} className="overlay-text">{g}</div>
                        ))}
                        <div className="overlay-text">⭐ {s.rating?.average ?? 'N/A'}</div>
                    </div>
                </div>
            </div>
            <div className="result-info">
                <div className="result-title result-title-custom">{s.name}</div>
                <div className="result-year">{s.premiered ? new Date(s.premiered).getFullYear() : ''}</div>
            </div>
        </div>
    );
};

export default ResultCard;
