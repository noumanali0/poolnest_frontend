import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const CustomerSummaryDosageDetailSlice = createSlice({
  name: "CustomerSummaryDosageDetail",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchgetAllCustomerSummaryDosageDetail.pending,
        (state, action) => {
          state.statusdata = STATUSES.LOADING;
        }
      )
      .addCase(
        fetchgetAllCustomerSummaryDosageDetail.fulfilled,
        (state, action) => {
          state.data = action.payload;
          state.statusdata = STATUSES.IDLE;
        }
      )
      .addCase(
        fetchgetAllCustomerSummaryDosageDetail.rejected,
        (state, action) => {
          state.statusdata = STATUSES.ERROR;
        }
      );
  },
});

export default CustomerSummaryDosageDetailSlice.reducer;

export const fetchgetAllCustomerSummaryDosageDetail = createAsyncThunk(
  "/CustomerSummaryDosageDetail/fetch",
  async ({ id }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    // const queryParams = {
    //   ...(name && { name }),

    //   ...(page && { page }),
    // };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/CustomerSummaryDosageDetail/${id}`,
      {
        headers: config,
      }
    );
    const emailData = res.data;
    return emailData;
  }
);
