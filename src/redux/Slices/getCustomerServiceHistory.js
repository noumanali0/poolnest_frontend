import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const CustomerServiceHistorySlice = createSlice({
  name: "CustomerServiceHistory",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerServiceHistory.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchCustomerServiceHistory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchCustomerServiceHistory.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default CustomerServiceHistorySlice.reducer;

export const fetchCustomerServiceHistory = createAsyncThunk(
  "/CustomerServiceHistoryget/fetch",
  async ({id}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/ActiveService/ServiceHistoryByWaterBody/${id}`,
      config
    );
    const CustomersData = res.data;
    return CustomersData;
  }
);
