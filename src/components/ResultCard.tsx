import React from 'react';
import defaultImage from '../assets/default-image.png';
import { Show } from '../types/show';

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
        <div className="result-card" onClick={() => onSelect(s)} style={{ cursor: 'pointer' }}>
            <div className="result-image-wrap">
                <img src={s.image?.medium || s.image?.original || defaultImage} alt={s.name} className="result-image" />
                <div className="result-overlay">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {(s.genres || []).slice(0, 2).map(g => (
                            <div key={g} className="overlay-text">{g}</div>
                        ))}
                        <div className="overlay-text">⭐ {s.rating?.average ?? 'N/A'}</div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13, color: '#dfe6e9' }}>
                <div className="result-title" style={{ textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{s.name}</div>
                <div style={{ textAlign: 'right', color: '#b2bec3' }}>{s.premiered ? new Date(s.premiered).getFullYear() : ''}</div>
            </div>
        </div>
    );
};

export default ResultCard;
