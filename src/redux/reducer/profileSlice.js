import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../../services/bid.service"; // ✅ Correct path

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (profileId, thunkAPI) => {
    console.log("🔥 Fetching profile with ID:", profileId);
    try {
      const response = await getUserProfile(profileId);
      console.log("🔥 Profile API Success:", response);
      return response;
    } catch (error) {
      console.error("🔥 Profile API Error:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("🔥 Profile loading started...");
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log("🔥 Profile loaded successfully:", action.payload);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("🔥 Profile loading failed:", action.payload);
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;