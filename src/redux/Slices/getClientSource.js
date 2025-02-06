import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getClientSource = createSlice({
  name: "clientsource",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
    fetched: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchClientSource.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchClientSource.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchClientSource.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default getClientSource.reducer;

export const fetchClientSource = createAsyncThunk(
  "/clientsourceget/fetch",
  async () => {


    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/ClientSource`,
        config
      );
      const sourceData = res.data.result.items;
      return sourceData;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching tags:", error);
      throw error;
    }
  }
);
