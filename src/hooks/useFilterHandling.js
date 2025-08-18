// src/hooks/useFilterHandling.js

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { decodeUrlToFilters, buildQueryString } from '../utils/urlHelpers';
import { DASHBOARD_CONSTANTS } from '../utils/constants';

export const useFilterHandling = (perPage) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const [filters, setFilters] = useState(DASHBOARD_CONSTANTS.DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DASHBOARD_CONSTANTS.DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  // URL decode effect
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const hasFilterParams =
      searchParams.get("bid_type") ||
      searchParams.get("state") ||
      searchParams.get("solicitation") ||
      searchParams.get("include") ||
      searchParams.get("exclude") ||
      searchParams.get("unspsc_codes") ||
      searchParams.get("naics_codes") ||
      searchParams.get("open_date_after") ||
      searchParams.get("open_date_before") ||
      searchParams.get("closing_date_after") ||
      searchParams.get("closing_date_before") ||
      searchParams.get("ordering"); // 🔥 FIXED: Added ordering check

    if (isInitialLoad) {
      if (hasFilterParams) {
        // URL has filters - restore them
        const decodedFilters = decodeUrlToFilters(searchParams);
        console.log("🔥 Restoring filters from URL:", decodedFilters);
        setFilters(decodedFilters);
        setAppliedFilters(decodedFilters);
      } else {
      
        setFilters(DASHBOARD_CONSTANTS.DEFAULT_FILTERS);
        setAppliedFilters(DASHBOARD_CONSTANTS.DEFAULT_FILTERS);
        navigate("/dashboard?page=1&pageSize=25&bid_type=Active&ordering=closing_date", {
          replace: true,
        });
      }
      setIsInitialLoad(false);
    } else if (hasFilterParams) {
      // Subsequent navigation with filters - restore them
      const decodedFilters = decodeUrlToFilters(searchParams);

      setFilters(decodedFilters);
      setAppliedFilters(decodedFilters);
    }
  }, [location.search, navigate, isInitialLoad]);


  // Filter apply handler
  const handleFiltersApply = useCallback((newFilters) => {
    setFilters(newFilters);
    setAppliedFilters(newFilters);
    setCurrentPage(1);

    const queryString = buildQueryString(newFilters, 1, perPage);
    navigate(`/dashboard?${queryString}`);
  }, [navigate, perPage]);

  // Sort handler
  const handleSort = useCallback((field) => {
    setFilters((prev) => {
      const current = prev.ordering;
      let newOrder;

      if (current === field) {
        newOrder = `-${field}`;
      } else if (current === `-${field}`) {
        newOrder = field;
      } else {
        newOrder = field;
      }

      const updatedFilters = { ...prev, ordering: newOrder };
      setAppliedFilters(updatedFilters);

      const queryString = buildQueryString(updatedFilters, currentPage, perPage);
      navigate(`/dashboard?${queryString}`);

      return updatedFilters;
    });
  }, [currentPage, perPage, navigate]);

  return {
    filters,
    setFilters,
    appliedFilters,
    setAppliedFilters,
    currentPage,
    setCurrentPage,
    isInitialLoad,
    handleFiltersApply,
    handleSort
  };
};