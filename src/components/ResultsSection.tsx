import { useQuery } from "@tanstack/react-query";
import { Show } from "../types/show";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ResultCard from "./ResultCard";
import { fetchSeries } from "../http";
import { SearchResult } from "../types/searchResults";
import './ResultsSection.css';

const PAGE_SIZE = 10;

interface ResultsSectionProps {
  searchTerm: string;
  favorites?: SearchResult[];
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ searchTerm, favorites }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const savedResults = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('searchResults');
      return raw ? (JSON.parse(raw) as SearchResult[]) : undefined;
    } catch {
      return undefined;
    }
  }, []);

  const { data: results = [], isFetching, isError, error } = useQuery<SearchResult[]>({
    queryKey: ['series', searchTerm],
    queryFn: () => fetchSeries(searchTerm),
    enabled: !!searchTerm && !favorites,
    initialData: savedResults,
  });

  // Use favorites if provided, else use fetched results
  const displayResults = favorites || results;

  // persist results when they change
  useEffect(() => {
    try {
      if (results && results.length > 0 && !favorites) sessionStorage.setItem('searchResults', JSON.stringify(results));
    } catch { }
  }, [results, favorites]);

  // Load saved page
  useEffect(() => {
    const savedPage = sessionStorage.getItem('searchPage');
    if (savedPage) setPage(Number(savedPage));
  }, []);

  const handleSelect = (show: Show) => {
    // save current state then navigate
    try {
      sessionStorage.setItem('searchTerm', searchTerm);
      sessionStorage.setItem('searchPage', String(page));
      if (!favorites) sessionStorage.setItem('searchResults', JSON.stringify(results));
      sessionStorage.setItem('backPath', window.location.pathname);
    } catch { }
    navigate(`/series/${show.id}`);
  };

  const nextPage = () => {
    const totalPages = Math.max(1, Math.ceil(displayResults.length / PAGE_SIZE));
    if (page < totalPages) {
      setPage(page + 1);
      sessionStorage.setItem('searchPage', String(page + 1));
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      sessionStorage.setItem('searchPage', String(page - 1));
    }
  };

  const totalPages = Math.max(1, Math.ceil(displayResults.length / PAGE_SIZE));
  const paginated = displayResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return <>
    {isError && (
      <div className="error error-custom">
        {error instanceof Error ? error.message : 'An error occurred while fetching data.'}
      </div>
    )}
    {isFetching && <div className="loading">Loading...</div>}

    {!isFetching && displayResults && displayResults.length > 0 && (
      <div>
        <div className="results-grid">
          {paginated.map((item) => (
            <ResultCard key={item.show.id} item={item} onSelect={handleSelect} />
          ))}
        </div>

        <div className="pagination-container">
          <button className="pagination-button" disabled={page <= 1} onClick={prevPage}>Prev</button>
          <div className="page-info">Page {page} of {totalPages}</div>
          <button className="pagination-button" disabled={page >= totalPages} onClick={() => nextPage()}>Next</button>
        </div>
      </div>
    )}

    {!isFetching && displayResults && displayResults.length === 0 && (
      <div className="no-results">No results</div>
    )}
  </>
}

export default ResultsSection;