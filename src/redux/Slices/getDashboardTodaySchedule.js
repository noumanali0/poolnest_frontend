import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const DashboardTodayScheduleSlice = createSlice({
  name: "DashboardTodaySchedule",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardTodaySchedule.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchDashboardTodaySchedule.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchDashboardTodaySchedule.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default DashboardTodayScheduleSlice.reducer;

export const fetchDashboardTodaySchedule = createAsyncThunk(
  "/DashboardTodayScheduleget/fetch",
  async ({date}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/DashboardTodaySchedule?date=${date}`, config
    );
    const Data = res.data;
    return Data;
  }
);
