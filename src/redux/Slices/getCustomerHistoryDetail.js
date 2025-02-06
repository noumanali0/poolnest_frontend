import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const CustomereHistoryDetailsSlice = createSlice({
  name: "CustomereHistoryDetails",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomereHistoryDetails.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchCustomereHistoryDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchCustomereHistoryDetails.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default CustomereHistoryDetailsSlice.reducer;

export const fetchCustomereHistoryDetails = createAsyncThunk(
  "/CustomereHistoryDetailsget/fetch",
  async ({id,date}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/ActiveService/GetServiceDetail/${id}`,
      config
    );
    const CustomersData = res.data.data;
    return CustomersData;
  }
);
