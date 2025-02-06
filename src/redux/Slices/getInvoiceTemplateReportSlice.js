import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const InvoiceTemplateSlice = createSlice({
  name: "InvoiceTemplate",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
    loading:false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoiceTemplate.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.loading = false;
      })
      .addCase(fetchInvoiceTemplate.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
        state.loading = true;
      })
      .addCase(fetchInvoiceTemplate.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.loading = false;
      })
  }
});

export default InvoiceTemplateSlice.reducer;





export const fetchInvoiceTemplate = createAsyncThunk(
  "/InvoiceTemplategetall/fetch",
   async ({ID,SID, StartDate, EndDate}) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/InvoicingPaymentHistory/InvoicingTemplate/${ID}/${SID}/${StartDate}/${EndDate}`, {
      headers: config,
    });
    const LabourData = res?.data;
    return LabourData;
  }
);
