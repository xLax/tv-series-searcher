import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { Show } from '../types/show';
import { CastMember } from '../types/castMember';
import CastItem from '../components/CastItem';
import { RootState } from '../store/store';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { fetchCast, fetchShow } from '../http';

const SeriesDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

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

  const isFavorite = favorites.some(fav => fav.id === show.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(show.id));
    } else {
      dispatch(addFavorite(show));
    }
  };

  const backPath = sessionStorage.getItem('backPath') || '/';

  return (
    <div className="series-details-page">
      <Link to={backPath} className="back-link">← Back</Link>
      <button className="favorite-btn-details" onClick={toggleFavorite}>
        {isFavorite ? '★' : '☆'}
      </button>
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
