import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const DashboardWorkOrderSlice = createSlice({
  name: "DashboardWorkOrder",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardWorkOrder.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchDashboardWorkOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchDashboardWorkOrder.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default DashboardWorkOrderSlice.reducer;

export const fetchDashboardWorkOrder = createAsyncThunk(
  "/DashboardWorkOrderget/fetch",
  async ({ start_date, end_date}) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(start_date && { start_date }),
      ...(end_date && { end_date }),
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/DashboardWorkOrder`, {
      params: queryParams,
      headers: config,
    }
    );
    const Data = res.data;
    return Data;
  }
);
