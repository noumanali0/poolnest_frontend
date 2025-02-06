import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getCustomersSlice = createSlice({
  name: "getCustomer",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
    fetched: false, // Add a property to track whether data has been fetched
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetCustomers.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetCustomers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchgetCustomers.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchAllgetCustomers.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchAllgetCustomers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchAllgetCustomers.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getCustomersSlice.reducer;

export const fetchgetCustomers = createAsyncThunk(
  "/getCustomersget/fetch",
  async (
    {
      first_name,
      customer_type_id,
      status,
      currentPage,
      size,
      NumberOfRouteAssigned,
    },
    thunkAPI
  ) => {
    const token = Cookies.get("userToken");

    const config = {
      Authorization: token,
    };
    const queryParams = {
      ...(first_name && { first_name }),
      ...(size && { size }),
      ...(status && { status }),
      ...(customer_type_id && { CustomerTypeName: customer_type_id }),
      ...(currentPage && { page: currentPage }),
      ...(NumberOfRouteAssigned !== undefined && { NumberOfRouteAssigned: 0 }),
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/customer`, {
        params: queryParams,
        headers: config,
      });

      const CustomersData = res.data.result;
      return CustomersData;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  }
);

export const fetchAllgetCustomers = createAsyncThunk(
  "/getAllCustomersget/fetch",
  async ({ currentPage, first_name }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(first_name && { first_name }),
      ...(currentPage && { size: currentPage }),
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer?size=450`,
        {
          params: queryParams,
          headers: config,
        }
      );
      const CustomersData = res.data.result;
      return CustomersData;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching all customers:", error);
      throw error;
    }
  }
);
