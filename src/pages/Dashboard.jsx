import React, { useState, useEffect, useRef, useCallback } from "react";
import AlertToggle from "../components/AlertToggle";
import HeroHeading from "../components/HeroHeading";
import BgCover from "../components/BgCover";
import BidTable from "../components/BidTable";
import Pagination from "../components/Pagination";
import FilterPanel from "../components/FilterPanel";
import FilterPanelSaveSearch from "../components/FilterPanelSaveSearch";
import { useNavigate, useLocation } from "react-router-dom";
import { getBidCount, getBids, getSavedSearches } from "../services/bid.service";
import { useDispatch, useSelector } from "react-redux";
import { setBids } from "../redux/reducer/bidSlice";
import { addSavedSearch } from "../redux/reducer/savedSearchesSlice";
import ProfessionalSavedSearchDropdown from '../components/ProfessionalSavedSearchDropdown'; // Add this import
import StatShimmer from "../components/StatShimmer";
import BidTableShimmer from "../components/shimmereffects/BidTableShimmer";
import { useUserTimezone } from "../timezone/useUserTimezone";
import { fetchUserProfile } from "../redux/reducer/profileSlice";


function Dashboard() {
  const perPage = 25;
  const navigate = useNavigate();
  const location = useLocation();
  const tableRef = useRef();
  const bidsSectionRef = useRef(null);
  const dispatch = useDispatch();
  const { bidsInfo } = useSelector((state) => state.bids);
  const { savedSearches } = useSelector((state) => state.savedSearches);
  const { timezone: userTimezone } = useUserTimezone();
  // Add debugging to see the full state structure
  console.log("🔥 Full Redux State:", useSelector((state) => state));
  console.log("🔥 ProfileBids State:", useSelector((state) => state.profileBids));
  const [selectedSavedSearch, setSelectedSavedSearch] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [bidCount, setBidCount] = useState({ count: 0, new_bids: 0 });      
  
  
  const profile = useSelector((state) => state.profile.profile);
  // const loading = useSelector((state) => state.profile.loading);
  console.log(profile);
  const companyName = profile?.user?.company_name;
  console.log(companyName)
  
  const data = { title: `${companyName.toUpperCase()}'s Dashboard` };

  // 🔥 SINGLE SOURCE OF TRUTH - Remove duplicate filter states
  const [filters, setFilters] = useState({
    status: "Active",
    keyword: { include: [], exclude: [] },
    location: [],
    UNSPSCCode: [],
    NAICSCode: [],
    publishedDate: { after: "", before: "" },
    closingDate: { after: "", before: "" },
    solicitationType: [],
    ordering: "closing_date", // 🔥 FIXED: Added default ordering
    entityType: "",
  });

  // 🔥 APPLIED FILTERS - Only these are used for API calls
  const [appliedFilters, setAppliedFilters] = useState({
    status: "Active",
    keyword: { include: [], exclude: [] },
    location: [],
    UNSPSCCode: [],
    NAICSCode: [],
    publishedDate: { after: "", before: "" },
    closingDate: { after: "", before: "" },
    solicitationType: [],
    ordering: "closing_date", // 🔥 FIXED: Added default ordering
    entityType: "",
  });

  const [saveSearchFilters, setSaveSearchFilters] = useState({});
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [saveSearchToggle, setSaveSearchToggle] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("Status");
  const [searchOption, setSearchOption] = useState("create");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [topSearchTerm, setTopSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { timezone, locationPermission } = useUserTimezone();
  const [entityTypeFilter, setEntityTypeFilter] = useState("");
  useEffect(() => {
    const handlePopState = (e) => {
      window.history.pushState(null, '', window.location.href);
    };

    // Push a new state
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    console.log("Current Timezone:", timezone);
    console.log("Location Permission:", locationPermission);
    // Use timezone in your logic here...
  }, [timezone, locationPermission]);

  useEffect(() => {
    const fetchBidCount = async () => {
      try {
        const countData = await getBidCount();
        setBidCount(countData);
        console.log("🔥 Fetched bid count:", countData);
        console.log(bidCount, "🔥 Bid count state updated");
      } catch (error) {
        console.error("❌ Error fetching bid count:", error);
      }
    };

    fetchBidCount();
  }, []);

  // Summary data for dashboard middle section
  const middle = [
    { id: 1, title: "Total Bids", num: bidCount?.count || 0 },
    { id: 2, title: "Active Bids", num: bidsInfo?.count || 0 },
    { id: 3, title: "New Bids", num: bidCount?.new_bids || 0 },
    { id: 4, title: "Saved", num: "0" },
    { id: 5, title: "Followed", num: "0/25" },
  ];

  // 🔥 FIXED: Proper sort handler with toggle logic
  const handleSort = (field) => {
    console.log("🔥 Sort requested for field:", field);
    console.log("🔥 Current ordering:", appliedFilters.ordering);

    setFilters((prev) => {
      const current = prev.ordering;
      let newOrder;

      // 🔥 PROPER TOGGLE LOGIC
      if (current === field) {
        // Currently ascending, make it descending
        newOrder = `-${field}`;
      } else if (current === `-${field}`) {
        // Currently descending, make it ascending
        newOrder = field;
      } else {
        // Different field or no sorting, start with ascending
        newOrder = field;
      }

      console.log("🔥 New ordering:", newOrder);

      const updatedFilters = {
        ...prev,
        ordering: newOrder,
      };

      // 🔥 IMMEDIATELY UPDATE APPLIED FILTERS
      setAppliedFilters(updatedFilters);

      // 🔥 BUILD URL WITH NEW SORT
      const queryString = buildQueryString(updatedFilters);
      navigate(`/dashboard?${queryString}`);

      return updatedFilters;
    });
  };

  // 🔥 IMPROVED DECODE FUNCTION - Matches FilterPanel exactly
  const decodeUrlToFilters = (searchParams) => {
    const decodedFilters = {
      status: "",
      keyword: { include: [], exclude: [] },
      location: [],
      UNSPSCCode: [],
      solicitationType: [],
      NAICSCode: [],
      publishedDate: { after: "", before: "" },
      closingDate: { after: "", before: "" },
      ordering: "closing_date", // 🔥 FIXED: Added default ordering
      entityType: "",
    };

    if (searchParams.get("bid_type")) {
      decodedFilters.status = searchParams.get("bid_type");
    }

    if (searchParams.get("state")) {
      decodedFilters.location = searchParams.get("state").split(",");
    }

    if (searchParams.get("solicitation")) {
      decodedFilters.solicitationType = searchParams
        .get("solicitation")
        .split(",");
    }

    if (searchParams.get("include")) {
      decodedFilters.keyword.include = searchParams.get("include").split(",");
    }

    if (searchParams.get("exclude")) {
      decodedFilters.keyword.exclude = searchParams.get("exclude").split(",");
    }

    if (searchParams.get("unspsc_codes")) {
      const codes = searchParams.get("unspsc_codes").split(",");
      decodedFilters.UNSPSCCode = codes.map((code) => ({ code }));
    }

    if (searchParams.get("naics_codes")) {
      const codes = searchParams.get("naics_codes").split(",");
      decodedFilters.NAICSCode = codes.map((code) => ({ code }));
    }

    if (searchParams.get("open_date_after")) {
      decodedFilters.publishedDate.after = searchParams.get("open_date_after");
    }

    if (searchParams.get("open_date_before")) {
      decodedFilters.publishedDate.before =
        searchParams.get("open_date_before");
    }

    if (searchParams.get("closing_date_after")) {
      decodedFilters.closingDate.after = searchParams.get("closing_date_after");
    }

    if (searchParams.get("closing_date_before")) {
      decodedFilters.closingDate.before = searchParams.get(
        "closing_date_before"
      );
    }

    // 🔥 FIXED: Added ordering decode from URL
    if (searchParams.get("ordering")) {
      decodedFilters.ordering = searchParams.get("ordering");
    }

    if (searchParams.get("entity_type")) {
      decodedFilters.entityType = searchParams.get("entity_type");
    }

    return decodedFilters;
  };

  // 🔥 MAIN FIX - Proper URL decode on component mount and navigation
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
      // First load - check if URL has filters
      if (hasFilterParams) {
        // URL has filters - restore them
        const decodedFilters = decodeUrlToFilters(searchParams);
        // console.log("🔥 Restoring filters from URL:", decodedFilters);
        setFilters(decodedFilters);
        setAppliedFilters(decodedFilters);
      } else {
        // No filters in URL - set defaults
        const defaultFilters = {
          status: "Active",
          keyword: { include: [], exclude: [] },
          location: [],
          UNSPSCCode: [],
          solicitationType: [],
          NAICSCode: [],
          publishedDate: { after: "", before: "" },
          closingDate: { after: "", before: "" },
          ordering: "closing_date", // 🔥 FIXED: Added default ordering
        };
        setFilters(defaultFilters);
        setAppliedFilters(defaultFilters);
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

  // Function to build query string from filters
  const buildQueryString = (filters) => {
    const params = new URLSearchParams();

    params.append("page", currentPage.toString());
    params.append("pageSize", perPage.toString());

    if (filters.status) {
      params.append("bid_type", filters.status);
    }

    if (filters.location && filters.location.length > 0) {
      params.append("state", filters.location.join(","));
    }

    if (filters.solicitationType && filters.solicitationType.length > 0) {
      params.append("solicitation", filters.solicitationType.join(","));
    }

    if (filters.keyword?.include && filters.keyword.include.length > 0) {
      params.append("include", filters.keyword.include.join(","));
    }

    if (filters.keyword?.exclude && filters.keyword.exclude.length > 0) {
      params.append("exclude", filters.keyword.exclude.join(","));
    }

    if (filters.UNSPSCCode && filters.UNSPSCCode.length > 0) {
      const codes = filters.UNSPSCCode.map((item) => item.code);
      params.append("unspsc_codes", codes.join(","));
    }

    if (filters.NAICSCode && filters.NAICSCode.length > 0) {
      const codes = filters.NAICSCode.map((item) => item.code);
      params.append("naics_codes", codes.join(","));
    }

    if (filters.publishedDate?.after) {
      params.append("open_date_after", filters.publishedDate.after);
    }

    if (filters.publishedDate?.before) {
      params.append("open_date_before", filters.publishedDate.before);
    }

    if (filters.closingDate?.after) {
      params.append("closing_date_after", filters.closingDate.after);
    }

    if (filters.closingDate?.before) {
      params.append("closing_date_before", filters.closingDate.before);
    }

    // Add ordering parameter
    if (filters.ordering) {
      params.append("ordering", filters.ordering);
    }
    if (filters.entityType) {
      params.append("entity_type", filters.entityType);
    }

    console.log(params.toString(), "🔥 Built query string from filters");
    return params.toString();
  };

  // Function to fetch bids with applied filters
  const fetchBids = useCallback(async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("User not logged in");
      dispatch(setBids([]));
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const hasActiveFilters =
        appliedFilters.status !== "Active" ||
        (appliedFilters.location?.length > 0) ||
        (appliedFilters.solicitationType?.length > 0) ||
        (appliedFilters.keyword?.include?.length > 0) ||
        (appliedFilters.keyword?.exclude?.length > 0) ||
        (appliedFilters.UNSPSCCode?.length > 0) ||
        (appliedFilters.NAICSCode?.length > 0) ||
        appliedFilters.publishedDate?.after ||
        appliedFilters.publishedDate?.before ||
        appliedFilters.closingDate?.after ||
        appliedFilters.closingDate?.before ||
        appliedFilters.entityType;

      const filtersToUse = hasActiveFilters
        ? appliedFilters
        : { ...appliedFilters, status: "Active" };

      let queryString = buildQueryString(filtersToUse);

      // 🔥 FIXED: Removed double ordering logic - buildQueryString already handles it
      console.log("🔥 Fetching bids with query:", queryString);

      const res = await getBids(`?${queryString}`);
      console.log(res, "🔥 Fetched bids data");
      dispatch(setBids(res));
    } catch (err) {
      console.error("Failed to fetch bids:", err);
      setError("Failed to fetch bids");
    } finally {
      setLoading(false);
    }
  }, [currentPage, navigate, perPage, appliedFilters, dispatch]);


  const handleEntityTypeChange = (entityType) => {
    console.log("🔥 Entity type selected:", entityType);

    const updatedFilters = {
      ...appliedFilters,
      entityType: entityType
    };

    // Update both filter states
    setFilters(updatedFilters);
    setAppliedFilters(updatedFilters);
    setCurrentPage(1); // Reset to first page

    // Build new URL with entity type filter
    const queryString = buildQueryString(updatedFilters);
    navigate(`/dashboard?${queryString}`);
  };



  // Fetch bids on component mount and page change
  useEffect(() => {
    if (!isInitialLoad) {
      fetchBids();
    }

  }, [fetchBids, isInitialLoad]);

  // 🔥 FILTER APPLY HANDLER - When filters are applied from FilterPanel
  const handleFiltersApply = (newFilters) => {
    // console.log("🔥 Filters applied from FilterPanel:", newFilters);

    // setTopSearchTerm(""); // Clear top search term when filters are applied

    setFilters(newFilters);
    setAppliedFilters(newFilters);
    setCurrentPage(1); // Reset to first page

    // Build new URL with filters
    const queryString = buildQueryString(newFilters);
    navigate(`/dashboard?${queryString}`);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedSearches = await getSavedSearches();
        // console.log(savedSearches);
        // console.log("🔥 Fetched saved searches:", savedSearches);
        dispatch(addSavedSearch(savedSearches));
      } catch (error) {
        console.error("Error fetching saved searches:", error);
      }
    };

    fetchData();
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    if (id) {
      setSelectedSavedSearch(
        savedSearches.find((search) => String(search.id) === String(id)) || null
      );
    } else {
      setSelectedSavedSearch(null);
    }
  }, [location.search, savedSearches]);

  // useEffect(() => {
  //   dispatch(fetchUserProfile());
  // }, [dispatch]);


  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);



  // Handle selecting a saved search and applying filters
  const handleSavedSearchSelect = async (searchId) => {
    // 🔥 Handle "My Saved Searches" default option
    if (searchId === "_default_" || !searchId) {
      // Reset to default state
      const defaultFilters = {
        status: "Active",
        keyword: { include: [], exclude: [] },
        location: [],
        UNSPSCCode: [],
        solicitationType: [],
        NAICSCode: [],
        publishedDate: { after: "", before: "" },
        closingDate: { after: "", before: "" },
        ordering: "closing_date", // 🔥 FIXED: Added default ordering
      };

      console.log("🔥 Resetting to default dashboard state");

      setFilters(defaultFilters);
      setAppliedFilters(defaultFilters);
      setSelectedSavedSearch(null);
      setSaveSearchFilters({});
      setCurrentPage(1);
      setTopSearchTerm(""); // Clear search input too

      // Navigate to default URL
      navigate("/dashboard?page=1&pageSize=25&bid_type=Active&ordering=closing_date");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const matched = savedSearches.find((item) => item.id === searchId);
      console.log(matched.query_string, "🔥 Matched saved search");
      if (!matched) return;

      const urlParams = new URLSearchParams(matched.query_string);
      const decodedFilters = decodeUrlToFilters(urlParams);
      console.log(decodedFilters, "🔥 Decoded filters from saved search");

      setSelectedSavedSearch({ id: matched.id, name: matched.name });
      setSaveSearchFilters(matched.query_string);
      setFilters(decodedFilters);
      setAppliedFilters(decodedFilters);
      setCurrentPage(1);
      setTopSearchTerm(""); // Clear search input

      let cleanQueryString = matched.query_string;
      if (cleanQueryString.startsWith('?')) {
        cleanQueryString = cleanQueryString.substring(1);
      }

      const fullURL = `/dashboard?page=1&pageSize=25&${cleanQueryString}&id=${matched.id}`;
      navigate(fullURL);
    } catch (err) {
      console.error("Failed to load saved search filters", err);
    }
  };

  // Handle saving or updating a saved search
  const handleSaveOrUpdate = (data) => {
    console.log("Save or Update called with data:", data);
  };

  // Pagination page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTimeout(() => {
      if (bidsSectionRef.current) {
        bidsSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // Export bids handler
  const handleExport = () => {
    if (tableRef.current) {
      tableRef.current.exportToCSV();
    }
  };

  // Toggle filter panel visibility
  const handleOpenFilter = () => {
    setActiveFilterTab("Status");
    setSidebarToggle(true);
  };






  // 🔥 REAL-TIME SEARCH FUNCTION
  const handleTopSearch = (searchTerm) => {
    const cleanedTerm = searchTerm.trim();

    // If empty search, reset to default filters
    if (!cleanedTerm) {
      const defaultFilters = {
        ...appliedFilters,
        keyword: { include: [], exclude: [] },
      };

      setFilters(defaultFilters);
      setAppliedFilters(defaultFilters);
      setCurrentPage(1);

      const params = new URLSearchParams();
      params.append("page", "1");
      params.append("pageSize", perPage.toString());
      params.append("bid_type", defaultFilters.status || "Active");

      const queryString = params.toString();
      navigate(`/dashboard?${queryString}`);
      return;
    }

    // Create updated filters with the search term
    const updatedFilters = {
      ...appliedFilters,
      keyword: {
        ...appliedFilters.keyword,
        include: [cleanedTerm],
      },
    };

    console.log("🔥 Real-time search with term:", cleanedTerm);
    console.log("🔥 Updated filters:", updatedFilters);

    // Update both filter states
    setFilters(updatedFilters);
    setAppliedFilters(updatedFilters);
    setCurrentPage(1);

    // Build query string with page reset
    const params = new URLSearchParams();
    params.append("page", "1");
    params.append("pageSize", perPage.toString());

    if (updatedFilters.status) {
      params.append("bid_type", updatedFilters.status);
    }

    if (updatedFilters.location && updatedFilters.location.length > 0) {
      params.append("state", updatedFilters.location.join(","));
    }

    if (
      updatedFilters.solicitationType &&
      updatedFilters.solicitationType.length > 0
    ) {
      params.append("solicitation", updatedFilters.solicitationType.join(","));
    }

    if (
      updatedFilters.keyword?.include &&
      updatedFilters.keyword.include.length > 0
    ) {
      params.append("include", updatedFilters.keyword.include.join(","));
    }

    if (
      updatedFilters.keyword?.exclude &&
      updatedFilters.keyword.exclude.length > 0
    ) {
      params.append("exclude", updatedFilters.keyword.exclude.join(","));
    }

    if (updatedFilters.UNSPSCCode && updatedFilters.UNSPSCCode.length > 0) {
      const codes = updatedFilters.UNSPSCCode.map((item) => item.code);
      params.append("unspsc_codes", codes.join(","));
    }

    if (updatedFilters.NAICSCode && updatedFilters.NAICSCode.length > 0) {
      const codes = updatedFilters.NAICSCode.map((item) => item.code);
      params.append("naics_codes", codes.join(","));
    }

    if (updatedFilters.publishedDate?.after) {
      params.append("open_date_after", updatedFilters.publishedDate.after);
    }

    if (updatedFilters.publishedDate?.before) {
      params.append("open_date_before", updatedFilters.publishedDate.before);
    }

    if (updatedFilters.closingDate?.after) {
      params.append("closing_date_after", updatedFilters.closingDate.after);
    }

    if (updatedFilters.closingDate?.before) {
      params.append("closing_date_before", updatedFilters.closingDate.before);
    }

    const queryString = params.toString();
    console.log("🔥 Navigating to:", `/dashboard?${queryString}`);

    navigate(`/dashboard?${queryString}`);
  };



  // const handleTopSearch = (searchTerm) => {
  //   const cleanedTerm = searchTerm.trim();

  //   // If empty search, reset to filters without search keywords
  //   if (!cleanedTerm) {
  //     const defaultFilters = {
  //       ...appliedFilters,
  //       keyword: {
  //         include: appliedFilters.keyword?.include?.filter(term =>
  //           // Keep only filter panel keywords, remove search terms
  //           filters.keyword?.include?.includes(term)
  //         ) || [],
  //         exclude: appliedFilters.keyword?.exclude || []
  //       },
  //     };

  //     // Don't update filter panel state, only applied filters
  //     setAppliedFilters(defaultFilters);
  //     setCurrentPage(1);

  //     const queryString = buildQueryString(defaultFilters);
  //     navigate(`/dashboard?${queryString}`);
  //     return;
  //   }

  //   // Create updated filters with search term + existing filter keywords
  //   const existingFilterKeywords = filters.keyword?.include || [];
  //   const updatedFilters = {
  //     ...appliedFilters,
  //     keyword: {
  //       include: [...existingFilterKeywords, cleanedTerm], // Combine filter keywords + search
  //       exclude: appliedFilters.keyword?.exclude || []
  //     },
  //   };

  //   console.log("🔥 Real-time search with term:", cleanedTerm);
  //   console.log("🔥 Updated filters:", updatedFilters);

  //   // Update only applied filters, not filter panel state
  //   setAppliedFilters(updatedFilters);
  //   setCurrentPage(1);

  //   // Build query string manually
  //   const params = new URLSearchParams();
  //   params.append("page", "1");
  //   params.append("pageSize", perPage.toString());

  //   if (updatedFilters.status) {
  //     params.append("bid_type", updatedFilters.status);
  //   }

  //   if (updatedFilters.location && updatedFilters.location.length > 0) {
  //     params.append("state", updatedFilters.location.join(","));
  //   }

  //   if (updatedFilters.solicitationType && updatedFilters.solicitationType.length > 0) {
  //     params.append("solicitation", updatedFilters.solicitationType.join(","));
  //   }

  //   if (updatedFilters.keyword?.include && updatedFilters.keyword.include.length > 0) {
  //     params.append("include", updatedFilters.keyword.include.join(","));
  //   }

  //   if (updatedFilters.keyword?.exclude && updatedFilters.keyword.exclude.length > 0) {
  //     params.append("exclude", updatedFilters.keyword.exclude.join(","));
  //   }

  //   if (updatedFilters.UNSPSCCode && updatedFilters.UNSPSCCode.length > 0) {
  //     const codes = updatedFilters.UNSPSCCode.map((item) => item.code);
  //     params.append("unspsc_codes", codes.join(","));
  //   }

  //   if (updatedFilters.NAICSCode && updatedFilters.NAICSCode.length > 0) {
  //     const codes = updatedFilters.NAICSCode.map((item) => item.code);
  //     params.append("naics_codes", codes.join(","));
  //   }

  //   if (updatedFilters.publishedDate?.after) {
  //     params.append("open_date_after", updatedFilters.publishedDate.after);
  //   }

  //   if (updatedFilters.publishedDate?.before) {
  //     params.append("open_date_before", updatedFilters.publishedDate.before);
  //   }

  //   if (updatedFilters.closingDate?.after) {
  //     params.append("closing_date_after", updatedFilters.closingDate.after);
  //   }

  //   if (updatedFilters.closingDate?.before) {
  //     params.append("closing_date_before", updatedFilters.closingDate.before);
  //   }

  //   if (updatedFilters.ordering) {
  //     params.append("ordering", updatedFilters.ordering);
  //   }

  //   const queryString = params.toString();
  //   console.log("🔥 Navigating to:", `/dashboard?${queryString}`);

  //   navigate(`/dashboard?${queryString}`);
  // };






  // 🔥 DEBOUNCED SEARCH HANDLER
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setTopSearchTerm(value);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debounced search
    const newTimeout = setTimeout(() => {
      handleTopSearch(value);
    }, 500);

    setSearchTimeout(newTimeout);
  };


  useEffect(() => {
    const search = new URLSearchParams(location.search).get("include");
    if (search && search.trim !== "") {
      setTopSearchTerm(search);
    }
    // console.log(search);
  }, [location.search])




  return (
    <>
      <div className="py-[120px] bg-blue">
        {sidebarToggle && (
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onClose={() => setSidebarToggle(false)}
            activeTab={activeFilterTab}
            setActiveTab={setActiveFilterTab}
            onApply={handleFiltersApply} // 🔥 Pass the apply handler
          />
        )}

        {saveSearchToggle && (
          <FilterPanelSaveSearch
            filters={saveSearchFilters}
            setFilters={setSaveSearchFilters}
            onClose={() => setSaveSearchToggle(false)}
            onSave={handleSaveOrUpdate}
            selectedSearch={selectedSavedSearch}
            mode={searchOption}
            setSelectedSearch={setSelectedSavedSearch}
            savedSearches={savedSearches}
            onApply={() => setSaveSearchToggle(false)}
          />
        )}

        <div className="container-fixed py-10 px-4">
          <div className="dashboard-header flex justify-between items-center">
            <HeroHeading
              data={data}
            />
            <div className="flex items-center gap-[15px]">
              <span className="font-inter text-[#DBDBDB]">Alert</span>
              <AlertToggle />
              <div className="search-box bg-btn p-4 px-6 flex gap-3 items-center rounded-[30px]">
                <i className="far text-white fa-search"></i>
                <input
                  type="text"
                  placeholder="Search titles or organization or location"
                  className="text-white bg-transparent w-[300px] border-none outline-none"
                  value={topSearchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
            </div>
          </div>

          {/* <div className="dashboard-middle">
            <div className="max-w-[1200px] py-[80px] flex justify-center mx-auto gap-8">
              {middle.map((item) => (
                <BgCover key={item.id}>
                  <div className="flex gap-4">
                    <div className="text font-inter text-[#DBDBDB]">
                      {item.title}
                    </div>
                    <p className="num font-inter font-bold text-white">
                      {item.num}
                    </p>
                  </div>
                </BgCover>
              ))}
            </div>
          </div> */}

          <div className="dashboard-feature pt-44">
            <div className="flex justify-between items-center">
              <div className="feature-left">
                <div
                  className="bg-btn p-4 w-[56px] h-[56px] rounded-[16px] flex justify-center items-center cursor-pointer"
                  onClick={handleOpenFilter}
                  id="filter"
                >
                  <img
                    src={sidebarToggle ? "close.png" : "filter.png"}
                    className="w-6"
                    alt="Filter Toggle"
                  />
                </div>
              </div>
              <div className="dashboard-middle">
                {loading ? (
                  <StatShimmer /> // Updated professional shimmer
                ) : (
                  <div className="flex gap-3 text-[1em]">
                    {middle.map((item) => (
                      <BgCover key={item.id} >
                        <div className="flex gap-2">
                          <div className="text font-inter text-[#DBDBDB]">
                            {item.title}
                          </div>
                          <p className="num font-inter font-semibold text-white">
                            {item.num}
                          </p>
                        </div>
                      </BgCover>
                    ))}
                  </div>
                )}
              </div>



              <div className="feature-right">
                <div className="flex gap-4 items-center">
                  <div
                    className="bg-btn p-4 rounded-[16px] cursor-pointer"
                    onClick={handleExport}
                    id="export"
                  >
                    <img src="export.png" className="w-6" alt="Export" />
                  </div>

                  {/* UPDATED: the select dropdown */}
                  <ProfessionalSavedSearchDropdown
                    savedSearches={savedSearches}
                    selectedSavedSearch={selectedSavedSearch}
                    handleSavedSearchSelect={handleSavedSearchSelect}
                  />

                  <BgCover >
                    <div
                      className="text-white cursor-pointer"
                      onClick={() => setSaveSearchToggle(true)}
                    >
                      Save Search
                    </div>
                  </BgCover>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full" ref={bidsSectionRef}>
            {loading ? (
              <div className="text-white text-center py-10"><BidTableShimmer /></div>
            ) : error ? (
              <div className="text-red-400 text-center py-10">{error}</div>
            ) : (
              // <BidTable bids={bidsInfo?.results || []} ref={tableRef} />
              <BidTable
                timezone={userTimezone}
                bids={bidsInfo?.results || []}
                onEntityTypeChange={handleEntityTypeChange} // 🔥 ADD THIS
                currentEntityType={appliedFilters.entityType}
                totalCount={bidsInfo?.count || 0}
                currentSortField={appliedFilters.ordering || "closing_date"}
                currentSortOrder={appliedFilters.ordering?.startsWith('-') ? 'desc' : 'asc'}
                onSort={handleSort}
                ref={tableRef}
              />


            )}

            <Pagination
              totalResults={bidsInfo?.count || 0}
              perPage={bidsInfo?.page_size || perPage}
              currentPage={bidsInfo?.page || currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;