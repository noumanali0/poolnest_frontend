import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const GeneralSettingsDaysSlice = createSlice({
  name: "GeneralSettingsDays",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
    fetched: false // Add a property to track whether data has been fetched
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneralSettingsDays.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchGeneralSettingsDays.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchGeneralSettingsDays.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default GeneralSettingsDaysSlice.reducer;

export const fetchGeneralSettingsDays = createAsyncThunk(
  "/GeneralSettingsDaysget/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().GeneralSettingsDays;

    // Check if data has already been fetched
    if (state.fetched) {
      return state.data;
    }

    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/GeneralSettings/days`, config);
      const GeneralSettings = res.data.data;
      return GeneralSettings;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching rate type data:", error);
      throw error;
    }
  }
);
