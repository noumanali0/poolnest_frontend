import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getWaterbodyProfitDataSlice = createSlice({
  name: "getWaterbodyProfitData",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetWaterbodyProfitData.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchgetWaterbodyProfitData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchgetWaterbodyProfitData.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default getWaterbodyProfitDataSlice.reducer;

export const fetchgetWaterbodyProfitData = createAsyncThunk(
  "getWaterbodyProfitDatagetneew/fetch",
  async ({ id }, thunkAPI) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/ProfitDetailByWaterBody/${id}`,
      {
        headers: config,
      }
    );
    const InvoiceData = res.data;
    return InvoiceData;
  }
);
