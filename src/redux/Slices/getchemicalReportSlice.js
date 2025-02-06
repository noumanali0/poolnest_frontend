import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const chemicalReportSlice = createSlice({
  name: "chemicalReport",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchchemicalReport.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchchemicalReport.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchchemicalReport.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchCustomerDetailSummary.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchCustomerDetailSummary.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchCustomerDetailSummary.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchCustomerSummary.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchCustomerSummary.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchCustomerSummary.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchChemicalDosagesDetail.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchChemicalDosagesDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchChemicalDosagesDetail.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchCustomerSummaryDosageDetail.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchCustomerSummaryDosageDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchCustomerSummaryDosageDetail.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default chemicalReportSlice.reducer;

export const fetchchemicalReport = createAsyncThunk(
  "/chemicalReportget/fetch",
  async ({ StartDate, EndDate, Customer_type, currentPage }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(StartDate && { StartDate }),
      ...(EndDate && { EndDate }),
      ...(Customer_type && { Customer_type }),
      ...(currentPage && { page: currentPage }),
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/ChemicalDosages`,
      {
        params: queryParams,
        headers: config,
      }
    );
    const Data = res.data?.result;
    return Data;
  }
);

export const fetchCustomerDetailSummary = createAsyncThunk(
  "/CustomerDetailSummaryget/fetch",
  async ({ StartDate, EndDate, Customer_type, currentPage }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(StartDate && { StartDate }),
      ...(EndDate && { EndDate }),
      ...(Customer_type && { Customer_type }),
      ...(currentPage && { page: currentPage }),
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/CustomerDetailSummary`,
      {
        params: queryParams,
        headers: config,
      }
    );
    const Data = res.data?.result;
    return Data;
  }
);

export const fetchCustomerSummary = createAsyncThunk(
  "/CustomerSummaryget/fetch",
  async ({ StartDate, EndDate, Customer_type, currentPage }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(StartDate && { StartDate }),
      ...(EndDate && { EndDate }),
      ...(Customer_type && { Customer_type }),
      ...(currentPage && { page: currentPage }),
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/CustomerSummary?size=1000`,
      {
        params: queryParams,
        headers: config,
      }
    );
    const Data = res.data?.result;
    return Data;
  }
);

export const fetchChemicalDosagesDetail = createAsyncThunk(
  "/ChemicalDosagesDetailget/fetch",
  async ({ StartDate, EndDate, Customer_type, currentPage, id }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(StartDate && { StartDate }),
      ...(EndDate && { EndDate }),
      ...(Customer_type && { Customer_type }),
      ...(currentPage && { page: currentPage }),
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/ChemicalDosagesDetail/${id}`,
      {
        params: queryParams,
        headers: config,
      }
    );
    const Data = res.data;
    return Data;
  }
);

export const fetchCustomerSummaryDosageDetail = createAsyncThunk(
  "/CustomerSummaryDosageDetailget/fetch",
  async ({ StartDate, EndDate, Customer_type, currentPage, id }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(StartDate && { StartDate }),
      ...(EndDate && { EndDate }),
      ...(Customer_type && { Customer_type }),
      ...(currentPage && { page: currentPage }),
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/CustomerSummaryDosageDetail/${id}`,
      {
        params: queryParams,
        headers: config,
      }
    );
    const Data = res.data;
    return Data;
  }
);
