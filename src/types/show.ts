import { Image } from "./image";

export interface Show {
    id: number;
    name: string;
    image?: Image;
    genres?: string[];
    premiered?: string;
    rating?: {
        average?: number;
    };
    summary?: string;
}