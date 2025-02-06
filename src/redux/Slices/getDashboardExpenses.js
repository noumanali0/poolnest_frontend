import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const DashboardExpensesSlice = createSlice({
  name: "DashboardExpenses",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardExpenses.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchDashboardExpenses.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchDashboardExpenses.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default DashboardExpensesSlice.reducer;

export const fetchDashboardExpenses = createAsyncThunk(
  "/DashboardExpensesget/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/DashboardExpenses`, config
    );
    const Data = res.data;
    return Data;
  }
);
