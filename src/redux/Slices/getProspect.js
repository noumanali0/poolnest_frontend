import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getAllprospectSlice = createSlice({
  name: "getAllprospect",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetAllprospect.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetAllprospect.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetAllprospect.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchgetAllprospectSingle.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
        state.loading = true;
      })
      .addCase(fetchgetAllprospectSingle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.loading = false;
      })
      .addCase(fetchgetAllprospectSingle.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
        state.loading = false;
      })
      .addCase(fetchgetsingleProspectCustomer.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetsingleProspectCustomer.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetsingleProspectCustomer.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getAllprospectSlice.reducer;

export const fetchgetAllprospect = createAsyncThunk(
  "/getAllprospectget/fetch",
  async ({ name, isconverted, page, prospectType }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };
    const queryParams = {
      ...(name && { name }),
      ...(isconverted && { ProspectConverted: isconverted }),
      ...(prospectType && { Type: prospectType }),
      ...(page && { page }),
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/prospect`, {
      params: queryParams,
      headers: config,
    });
    const CustomersData = res.data.result;
    return CustomersData;
  }
);

export const fetchgetAllprospectSingle = createAsyncThunk(
  "/getDashboardApiget/fetch",
  async ({ id }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/prospect/${id}`,
      config
    );
    const CustomersData = res.data;
    return CustomersData;
  }
);

export const fetchgetsingleProspectCustomer = createAsyncThunk(
  "/getDashboardfetchgetsingleProspectCustomer/fetch",
  async ({ id }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/prospect/singleProspectCustomer/${id}`,
      config
    );
    const CustomersData = res.data?.data;
    return CustomersData;
  }
);
