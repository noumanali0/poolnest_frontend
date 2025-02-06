import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getProspectWaterlice = createSlice({
  name: "getProspectWaterbody",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
    detailData: {},
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetProspectWaterBody.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetProspectWaterBody.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetProspectWaterBody.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })

      .addCase(fetchgetSingleProspectWaterBody.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetSingleProspectWaterBody.fulfilled, (state, action) => {
        state.singleData = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetSingleProspectWaterBody.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchgetProspectWaterBodyDetail.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
        state.loading = true;
      })
      .addCase(fetchgetProspectWaterBodyDetail.fulfilled, (state, action) => {
        state.detailData = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.loading = false;
      })
      .addCase(fetchgetProspectWaterBodyDetail.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
        state.loading = false;
      });
  },
});

export default getProspectWaterlice.reducer;

export const fetchgetProspectWaterBody = createAsyncThunk(
  "/getProspectWaterbody/fetch",
  async ({ id }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/prospect/getProspectWaterbody/${id}`,
      {
        headers: config,
      }
    );
    const WaterBodyData = res.data.data;
    return WaterBodyData;
  }
);

export const fetchgetSingleProspectWaterBody = createAsyncThunk(
  "/getSingleProspectWaterbody/fetch",
  async ({ id }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/prospect/getSingleProspectWaterbody/${id}`,
      {
        headers: config,
      }
    );
    const WaterBodyData = res.data.data;
    return WaterBodyData;
  }
);

export const fetchgetProspectWaterBodyDetail = createAsyncThunk(
  "/fetchgetProspectWaterBodyDetail/fetch",
  async ({ id }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/prospect/getProspectWaterbodyDetail/${id}`,
      {
        headers: config,
      }
    );
    const WaterBodyData = res.data;
    return WaterBodyData;
  }
);
