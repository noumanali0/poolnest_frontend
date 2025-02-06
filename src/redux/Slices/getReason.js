import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getReasonSlice = createSlice({
  name: "getReason",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchReason.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchReason.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchReason.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getReasonSlice.reducer;

export const fetchReason = createAsyncThunk(
  "/getpoolgetReasonget/fetch",
  async ({ page, name }, thunkAPI) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(name && { name }),

      ...(page && { page }),
    };
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/SkipReason`, {
      params: queryParams,
      headers: config,
    });
    const ReasonData = res.data.result;
    return ReasonData.items;
  }
);
