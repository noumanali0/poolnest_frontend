import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const CustomerWorkOrderHistorySlice = createSlice({
  name: "CustomerWorkOrderHistory",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerWorkOrderHistory.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchCustomerWorkOrderHistory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchCustomerWorkOrderHistory.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default CustomerWorkOrderHistorySlice.reducer;

export const fetchCustomerWorkOrderHistory = createAsyncThunk(
  "/CustomerWorkOrderHistoryget/fetch",
  async ({id}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/ActiveService/WorkOrderHistoryByWaterBody/${id}`,
      config
    );
    const CustomersData = res.data;
    return CustomersData;
  }
);
