import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const postProspectWaterBody = createAsyncThunk(
  "postProspectWaterBody/postData",
  async ({ Data, id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/prospect/convertWaterbody/${id}`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postProspectNewWaterBody = createAsyncThunk(
  "postProspectNewWaterBody/postData",
  async ({ Data, id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");
    console.log(Data, id, "<=====Data, id");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/prospect/NewWaterBody/${id}`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postProspectWaterBodySlice = createSlice({
  name: "postProspectWaterBody",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postProspectWaterBody.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postProspectWaterBody.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postProspectWaterBody.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(postProspectNewWaterBody.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postProspectNewWaterBody.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postProspectNewWaterBody.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { clearData } = postProspectWaterBodySlice.actions;
export default postProspectWaterBodySlice.reducer;
