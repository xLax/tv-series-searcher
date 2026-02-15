import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [input, setInput] = useState<string>(initialValue);

  useEffect(() => {
    setInput(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const doSearch = () => {
    const term = input.trim();
    onSearch(term);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') doSearch();
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <div className="search-bar-container-outer">
      <div className="search-bar-container">
        <div className="search-input-wrap">
          <input
            type="text"
            placeholder="Search for a series..."
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="search-input"
            aria-label="Search"
          />
          {input && (
            <button className="search-clear-btn" onClick={clearInput} aria-label="Clear search">×</button>
          )}
          <button className="search-submit-btn" onClick={doSearch} aria-label="Run search">Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
