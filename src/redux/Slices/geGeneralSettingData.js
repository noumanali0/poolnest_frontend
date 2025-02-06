import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getGeneralSettingApiSlice = createSlice({
  name: "getGeneralSettingApi",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetGeneralSettingApi.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetGeneralSettingApi.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetGeneralSettingApi.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getGeneralSettingApiSlice.reducer;

export const fetchgetGeneralSettingApi = createAsyncThunk(
  "/getGeneralSettingApiget/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/GeneralSettings`,
      config
    );
    const CustomersData = res.data?.data;
    return CustomersData;
  }
);
