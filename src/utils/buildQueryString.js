// utils/buildQueryString.js

export const buildQueryString = (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.status) params.append("bid_type", filters.status);
  if (filters.keyword) params.append("bid_name", filters.keyword);
  if (filters.location) params.append("state", filters.location);

  if (filters.publishedDate?.from) params.append("open_date_after", filters.publishedDate.from);
  if (filters.publishedDate?.to) params.append("open_date_before", filters.publishedDate.to);

  if (filters.closingDate?.from) params.append("close_date_after", filters.closingDate.from);
  if (filters.closingDate?.to) params.append("close_date_before", filters.closingDate.to);

  if (filters.solicitationType?.length)
    params.append("solicitation", filters.solicitationType.join(","));

  if (filters.naics_codes?.length)
    params.append("naics_codes", filters.naics_codes.join(","));

  if (filters.unspsc_codes?.length)
    params.append("unspsc_codes", filters.unspsc_codes.join(","));

  if (filters.includeKeywords?.length)
    params.append("include", filters.includeKeywords.join(","));

  if (filters.excludeKeywords?.length)
    params.append("exclude", filters.excludeKeywords.join(","));

  return params.toString();
};
