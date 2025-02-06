import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const QuickBookDataToWebSlice = createSlice({
  name: "QuickBookDataToWeb",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
    Loading : false,
    LoadingItem : false
  },
  

  extraReducers: (builder) => {
    builder
      .addCase(QuickBookCustomersToWeb.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
        state.Loading = true
      })
      .addCase(QuickBookCustomersToWeb.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.Loading = false
      })
      .addCase(QuickBookCustomersToWeb.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
        state.Loading = false
      })
      .addCase(QuickBookItemsToWeb.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
        state.LoadingItem = true
      })
      .addCase(QuickBookItemsToWeb.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.LoadingItem = false
      })
      .addCase(QuickBookItemsToWeb.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
        state.LoadingItem = false
      });
  },
});

export default QuickBookDataToWebSlice.reducer;

export const QuickBookCustomersToWeb = createAsyncThunk(
  "/QuickBookCustomersToWeb/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/SuperAdminQuickBook/QuickBookCustomersToWeb`,
      config
    );
    const Data = res.data;
    return Data;
  }
);


export const QuickBookItemsToWeb = createAsyncThunk(
  "/QuickBookItemsToWeb/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/SuperAdminQuickBook/QuickBookItemsToWeb`,
      config
    );
    const Data = res.data;
    return Data;
  }
);
