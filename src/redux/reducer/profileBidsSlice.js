// src/store/reducer/profileBidsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileBids } from "../../services/bid.service"; // Import the service function

export const fetchProfileBids = createAsyncThunk(
  "profileBids/fetch",
  async (profileId, thunkAPI) => {
    console.log(profileId);
    try {
      const response = await profileBids(profileId);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const profileBidsSlice = createSlice({
  name: "profileBids",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileBids.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfileBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileBidsSlice.reducer;
