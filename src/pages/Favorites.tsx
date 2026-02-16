import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { SearchResult } from '../types/searchResults';
import ResultsSection from '../components/ResultsSection';

const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  // Convert favorites to SearchResult format
  const favoriteResults: SearchResult[] = favorites.map(show => ({ show }));

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center', color: '#00b894', marginBottom: '2rem' }}>My Favorites</h1>
      <ResultsSection searchTerm="" favorites={favoriteResults} />
    </div>
  );
};

export default Favorites;