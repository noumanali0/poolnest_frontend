import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// --------------- post Customer Data Reducer----------------- //

export const postPaymentData = createAsyncThunk(
  "postPaymentData/postData",
  async ({ Data, token }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/SuperAdminPaymentInfo/CreateSuperAdminPaymentInfo/${Data}`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const postPaymentDataSlice = createSlice({
  name: "postPaymentData",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
      state.error = null; // Reset error to null
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postPaymentData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(postPaymentData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Subscription Created Successfully";
      })
      .addCase(postPaymentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
        state.success = null;
      });
  },
});
export const { resetData } = postPaymentDataSlice.actions;

export default postPaymentDataSlice.reducer;
