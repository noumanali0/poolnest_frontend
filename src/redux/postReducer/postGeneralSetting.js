import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Define the async thunk for posting customer data
export const postgeneralSettingData = createAsyncThunk(
  "postgeneralSetting/postData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/GeneralSettings`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postgeneralSettingSlice = createSlice({
  name: "postgeneralSetting",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null
  },
  reducers: {
    resetData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
      state.error = null; // Reset error to null
      state.success = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postgeneralSettingData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null
      })
      .addCase(postgeneralSettingData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Updated Successfully"
      })
      .addCase(postgeneralSettingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
        state.success = null
      });
  },
});
export const { resetData } = postgeneralSettingSlice.actions; // Export the clearData action

export default postgeneralSettingSlice.reducer;
