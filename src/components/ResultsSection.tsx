import { useQuery } from "@tanstack/react-query";
import { Show } from "../types/show";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo } from "react";
import ResultCard from "./ResultCard";
import { fetchSeries } from "../http";
import { SearchResult } from "../types/searchResults";
import { PageContext } from "../store/page-context";

const PAGE_SIZE = 10;

const ResultsSection: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
    const { page, nextPage, prevPage } = useContext(PageContext);
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
        enabled: !!searchTerm,
        initialData: savedResults,
    });

    // persist results when they change
    useEffect(() => {
        try {
            if (results && results.length > 0) sessionStorage.setItem('searchResults', JSON.stringify(results));
        } catch { }
    }, [results]);

    const handleSelect = (show: Show) => {
        // save current state then navigate
        try {
            sessionStorage.setItem('searchTerm', searchTerm);
            sessionStorage.setItem('searchPage', String(page));
            sessionStorage.setItem('searchResults', JSON.stringify(results));
        } catch { }
        navigate(`/series/${show.id}`);
    };

    const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
    const paginated = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return <>
        {isError && (
            <div className="error" style={{ marginTop: 10, textAlign: 'center', color: '#e74c3c' }}>
                {error instanceof Error ? error.message : 'An error occurred while fetching data.'}
            </div>
        )}
        {isFetching && <div className="loading">Loading...</div>}

        {!isFetching && results && results.length > 0 && (
            <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24 }}>
                    {paginated.map((item) => (
                        <ResultCard key={item.show.id} item={item} onSelect={handleSelect} />
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 18, alignItems: 'center' }}>
                    <button className="pagination-button" disabled={page <= 1} onClick={prevPage}>Prev</button>
                    <div style={{ color: '#b2bec3' }}>Page {page} of {totalPages}</div>
                    <button className="pagination-button" disabled={page >= totalPages} onClick={() => nextPage(totalPages)}>Next</button>
                </div>
            </div>
        )}

        {!isFetching && results && results.length === 0 && (
            <div style={{ textAlign: 'center', color: '#b2bec3', marginTop: 20 }}>No results</div>
        )}
    </>
}

export default ResultsSection;