import { SearchResult } from "./types/searchResults";

export const fetchSeries = async (searchTerm: string): Promise<SearchResult[]> => {
    if (!searchTerm) return [];
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`);
    if (!res.ok) throw new Error('Failed to fetch search results, please check your network connection and try again.');
    return res.json();
}; 