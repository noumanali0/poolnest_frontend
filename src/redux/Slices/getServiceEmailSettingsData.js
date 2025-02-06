import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const ServiceEmailSettingsSlice = createSlice({
  name: "ServiceEmailSettings",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceEmailSettings.pending, (state, action) => {
        state.status= STATUSES.LOADING;
      })
      .addCase(fetchServiceEmailSettings.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status= STATUSES.IDLE;
      })
      .addCase(fetchServiceEmailSettings.rejected, (state, action) => {
        state.status= STATUSES.ERROR;
      });
  },
});

export default ServiceEmailSettingsSlice.reducer;

export const fetchServiceEmailSettings = createAsyncThunk(
  "/ServiceEmailSettingsget/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/ServiceEmailSettings`,
      config
    );
    const Data = res.data?.data;
    return Data;
  }
);
