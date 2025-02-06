import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getfrequencySlice = createSlice({
  name: "getfrequency",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
    fetched: false, // Add a property to track whether data has been fetched
    reccurenceData: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetfrequency.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetfrequency.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchgetfrequency.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchgetfrequencyWorkOrder.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetfrequencyWorkOrder.fulfilled, (state, action) => {
        state.reccurenceData = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetfrequencyWorkOrder.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getfrequencySlice.reducer;

export const fetchgetfrequency = createAsyncThunk(
  "/getfrequencyget/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().getfrequency;

    // Check if data has already been fetched

    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/frequency/WaterBodyFrequency`,
        config
      );
      const frequencyData = res.data?.data;
      return frequencyData;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching frequency data:", error);
      throw error;
    }
  }
);

export const fetchgetfrequencyWorkOrder = createAsyncThunk(
  "/getfrequencyWorkOrder/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().getfrequency;

    // Check if data has already been fetched
    // if (state.fetched) {
    //   return state.reccurenceData;
    // }

    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/frequency/WorkOrderType/GetFrequencyForWorkOrderType`,
        config
      );
      console.log(res, "<=====result");
      const frequencyData = res.data?.result.items;
      return frequencyData;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching frequency data:", error);
      throw error;
    }
  }
);
