import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Show } from '../types/show';
import { CastMember } from '../types/castMember';
import CastItem from '../components/CastItem';


const fetchShow = async (id: string): Promise<Show> => {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  if (!res.ok) throw new Error('Failed to fetch show');
  return res.json();
};

const fetchCast = async (id: string): Promise<CastMember[]> => {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
  if (!res.ok) throw new Error('Failed to fetch cast');
  return res.json();
};

const SeriesDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: show, isLoading: loadingShow } = useQuery<Show>({
    queryKey: ['show', id],
    queryFn: () => fetchShow(id!),
    enabled: !!id,
  });

  const { data: cast, isLoading: loadingCast } = useQuery<CastMember[]>({
    queryKey: ['cast', id],
    queryFn: () => fetchCast(id!),
    enabled: !!id,
  });

  if (loadingShow || loadingCast) return <div className="loading">Loading...</div>;
  if (!show) return <div className="error">Show not found.</div>;

  return (
    <div className="series-details-page">
      <Link to="/" className="back-link">← Back to Search</Link>
      <div className="details-top-section">
        <div className="details-image-wrapper">
          <img
            src={show.image?.original || show.image?.medium}
            alt={show.name}
            className="details-image"
          />
        </div>
        <div className="details-top-info">
          <h2 className="details-title">{show.name}</h2>
          <div className="details-meta">
            <span className="genre">{show.genres?.join(', ')}</span>
            <span className="year">{show.premiered ? new Date(show.premiered).getFullYear() : ''}</span>
            <span className="rating">⭐ {show.rating?.average || 'N/A'}</span>
          </div>
        </div>
      </div>
      <div className="details-section details-description">
        <h3>Description</h3>
        <div className="details-summary" dangerouslySetInnerHTML={{ __html: show.summary || '' }} />
      </div>
      <div className="details-section details-cast">
        <h3>Cast</h3>
        <ul>
          {cast && cast.length > 0 ? cast.map((c) => (
            <CastItem key={c.person.id} cast={c} />
          )) : <li>No cast information available.</li>}
        </ul>
      </div>
    </div>
  );
};

export default SeriesDetails;
