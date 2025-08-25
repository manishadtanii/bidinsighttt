import API from "../utils/axios.js";

export const getErrorBids = async () => {
  try {
    // const token = localStorage.getItem("access_token");
    // const headers   = { Authorization: `Bearer ${token}` };

    const response = await API.get(`/scrapping/logs/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching error bids:", error);
    throw error;
  }
};


export const scrapperBids = async () => {
    try {
        // const token = localStorage.getItem("access_token");
        // const headers   = { Authorization: `Bearer ${token}` };
    
        const response = await API.get(`/scrapping/scrapers/`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching scrapper bids:", error);
        throw error;
    }
}







//   try {
//     const token = localStorage.getItem("access_token");
//     const headers = { Authorization: `Bearer ${token}` };

//     const response = await API.post(
//       `/admin/reprocess-bid/${bidId}/`,
//       {},
//       { headers }
//     );
//     return response.data;
//   } catch (error) {
//     console.error(`❌ Error reprocessing bid ${bidId}:`, error);
//     throw error;
//   }
// };