import { CastMember } from "./types/castMember";
import { SearchResult } from "./types/searchResults";
import { Show } from "./types/show";

export const fetchSeries = async (searchTerm: string): Promise<SearchResult[]> => {
    if (!searchTerm) return [];
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`);
    if (!res.ok) throw new Error('Failed to fetch search results, please check your network connection and try again.');
    return res.json();
};

export const fetchShow = async (id: string): Promise<Show> => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    if (!res.ok) throw new Error('Failed to fetch show');
    return res.json();
};

export const fetchCast = async (id: string): Promise<CastMember[]> => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
    if (!res.ok) throw new Error('Failed to fetch cast');
    return res.json();
};
