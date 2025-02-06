import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getInvoiceRetrieveServiceDetailSlice = createSlice({
  name: "InvoiceRetrieveServiceDetail",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetInvoiceRetrieveServiceDetail.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetInvoiceRetrieveServiceDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetInvoiceRetrieveServiceDetail.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getInvoiceRetrieveServiceDetailSlice.reducer;

export const fetchgetInvoiceRetrieveServiceDetail = createAsyncThunk(
  "/getInvoiceRetrieveServiceDetailget/fetch",
  async ({id}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/RetrieveServiceDetail/${id}`,
      config
    );
    const CustomersData = res.data?.data;
    return CustomersData;
  }
);
