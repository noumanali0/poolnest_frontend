import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getRouteAssingnmentSlice = createSlice({
  name: "getRouteAssingnment",
  initialState: {
    data: [],
    changestatus: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetRouteAssingnment.pending, (state, action) => {
        state.changestatus = STATUSES.LOADING;
      })
      .addCase(fetchgetRouteAssingnment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.changestatus = STATUSES.IDLE;
      })
      .addCase(fetchgetRouteAssingnment.rejected, (state, action) => {
        state.changestatus = STATUSES.ERROR;
      })
      .addCase(fetchgetRouteAssingnmentSingle.pending, (state, action) => {
        state.changestatus = STATUSES.LOADING;
      })
      .addCase(fetchgetRouteAssingnmentSingle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.changestatus = STATUSES.IDLE;
      })
      .addCase(fetchgetRouteAssingnmentSingle.rejected, (state, action) => {
        state.changestatus = STATUSES.ERROR;
      });
  },
});

export default getRouteAssingnmentSlice.reducer;

export const fetchgetRouteAssingnment = createAsyncThunk(
  "/getRouteAssingnmentget/fetch",
  async ({ waterbody_id }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/RouteAssignment?waterbody_id=${waterbody_id}&size=1000`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData.items;
  }
);

export const fetchgetRouteAssingnmentSingle = createAsyncThunk(
  "/getRouteAssingnmentgetsingle/fetch",
  async ({ id }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/RouteAssignment/${id}`,
      config
    );
    const CustomersData = res.data.data;
    return CustomersData;
  }
);
