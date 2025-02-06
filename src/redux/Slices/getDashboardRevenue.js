import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const DashboardRevenueSlice = createSlice({
  name: "DashboardRevenue",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardRevenue.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchDashboardRevenue.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchDashboardRevenue.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default DashboardRevenueSlice.reducer;

export const fetchDashboardRevenue = createAsyncThunk(
  "/DashboardRevenueget/fetch",
  async ({ start_date, end_date, income, intervalType }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(start_date && { start_date }),
      ...(income && { income }),
      ...(intervalType && { intervalType }),
      ...(end_date && { end_date }),
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/DashboardRevenue`,
      {
        params: queryParams,
        headers: config,
      }
    );
    const Data = res.data;
    return Data;
  }
);
