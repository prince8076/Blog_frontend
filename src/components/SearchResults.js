import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchComponent from './SearchComponent';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const query = useQuery().get('query') || '';

    return (
        <div style={{ padding: '20px' }}>
            <h1>Search Results for: "{query}"</h1>
            <SearchComponent query={query} />
        </div>
    );
};

export default SearchResults;
