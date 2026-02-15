import React, { useState, useCallback, useEffect, useContext } from 'react';
import SearchBar from '../components/SearchBar';
import { PageContext } from '../store/page-context';
import ResultsSection from '../components/ResultsSection';

const Home: React.FC = () => {
  const { setPage } = useContext(PageContext);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // load saved state from sessionStorage (preserve when navigating back)
  useEffect(() => {
    const savedTerm = sessionStorage.getItem('searchTerm');
    const savedPage = sessionStorage.getItem('searchPage');

    if (savedTerm) setSearchTerm(savedTerm);
    if (savedPage) setPage(Number(savedPage));
    // results will be provided to useQuery as initialData
  }, [setPage]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setPage(1);
    sessionStorage.setItem('searchTerm', term);
    sessionStorage.setItem('searchPage', '1');
    // useQuery will automatically fetch because enabled follows searchTerm
  }, [setPage]);

  return (
    <div className="home-page" style={{ maxWidth: 1000, margin: '0 auto', padding: '1rem' }}>
      <h1 className="main-title">Series Search Engine</h1>
      <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
      <ResultsSection searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
