// src/hooks/useSearchHandling.js

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { buildQueryString } from '../utils/urlHelpers';

export const useSearchHandling = (appliedFilters, perPage) => {
  const [topSearchTerm, setTopSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Search term from URL effect
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl && searchFromUrl.trim() !== "") {
      setTopSearchTerm(searchFromUrl);
    } else {
      setTopSearchTerm("");
    }
  }, [location.search]);

  // Real-time search function
  const handleTopSearch = useCallback((searchTerm) => {
    const cleanedTerm = searchTerm.trim();

    if (!cleanedTerm) {
      const queryString = buildQueryString(appliedFilters, 1, perPage);
      navigate(`/dashboard?${queryString}`);
      return;
    }

    const queryString = buildQueryString(appliedFilters, 1, perPage);
    const params = new URLSearchParams(queryString);
    params.append("search", cleanedTerm);
    
    const finalQueryString = params.toString();
    navigate(`/dashboard?${finalQueryString}`);
  }, [appliedFilters, perPage, navigate]);

  // Debounced search handler
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setTopSearchTerm(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      handleTopSearch(value);
    }, 500);

    setSearchTimeout(newTimeout);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return {
    topSearchTerm,
    setTopSearchTerm,
    handleSearchInputChange
  };
};