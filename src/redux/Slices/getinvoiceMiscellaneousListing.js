import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const invoiceMiscellaneousListingSlice = createSlice({
  name: "invoiceMiscellaneousListing",
  initialState: {
    data: [],
    status: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetinvoiceMiscellaneousListing.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchgetinvoiceMiscellaneousListing.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchgetinvoiceMiscellaneousListing.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      
  }
});

export default invoiceMiscellaneousListingSlice.reducer;


export const fetchgetinvoiceMiscellaneousListing = createAsyncThunk(
  "/invoiceMiscellaneousListing/fetch",
  async ({Id}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token
      }
    };    
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/EditInvoice/invoiceMiscellaneousListing/${Id}`,
      config
    );
    const InvoiceData = res.data?.data;
    return InvoiceData;
  }
);




