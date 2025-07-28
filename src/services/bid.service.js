import API from "../utils/axios.js";

export const getBids = async (query) => {
  if (!query) {
    query = "?page=1&pageSize=500&include=active";
  }
  try {
    const response = await API.get(`/bids/${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bids:", error);
    throw error;
  }
};
