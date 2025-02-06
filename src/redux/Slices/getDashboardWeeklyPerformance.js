import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const DashboardWeeklyPerformanceSlice = createSlice({
  name: "DashboardWeeklyPerformance",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardWeeklyPerformance.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchDashboardWeeklyPerformance.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchDashboardWeeklyPerformance.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default DashboardWeeklyPerformanceSlice.reducer;

export const fetchDashboardWeeklyPerformance = createAsyncThunk(
  "/DashboardWeeklyPerformanceget/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/DashboardWeeklyPerformance`, config
    );
    const Data = res.data;
    return Data;
  }
);
