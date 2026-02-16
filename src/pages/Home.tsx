import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ResultsSection from '../components/ResultsSection';
import './Home.css';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // load saved state from sessionStorage (preserve when navigating back)
  useEffect(() => {
    const savedTerm = sessionStorage.getItem('searchTerm');
    if (savedTerm) setSearchTerm(savedTerm);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    sessionStorage.setItem('searchTerm', term);
    sessionStorage.setItem('searchPage', '1');
    // useQuery will automatically fetch because enabled follows searchTerm
  }, []);

  return (
    <div className="home-page home-container">
      <h1 className="main-title">Series Search Engine</h1>
      <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
      <ResultsSection searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
