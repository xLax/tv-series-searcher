import { createContext, useState } from "react";

type PageContextType = {
    page: number;
    setPage: (page: number) => void;
    nextPage: (totalPages: number) => void;
    prevPage: () => void;
};

export const PageContext = createContext<PageContextType>({
    page: 1,
    setPage: (page: number) => { },
    nextPage: () => { },
    prevPage: () => { },
});

const PageContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [page, setPage] = useState<number>(1);

    const handlePrevPage = () => {
        setPage(p => {
            const np = Math.max(1, p - 1);
            sessionStorage.setItem('searchPage', String(np));
            return np;
        });
    }

    const handleNextPage = (totalPages: number) => {
        setPage(p => {
            const np = Math.min(totalPages, p + 1);
            sessionStorage.setItem('searchPage', String(np));
            return np;
        });
    }

    const pageContextValue: PageContextType = {
        page: page,
        setPage,
        nextPage: handleNextPage,
        prevPage: handlePrevPage,
    }

    return <PageContext.Provider value={pageContextValue}>{children}</PageContext.Provider>;
}

export default PageContextProvider;