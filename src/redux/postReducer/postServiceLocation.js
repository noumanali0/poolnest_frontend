import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const postServiceLocationData = createAsyncThunk(
  "postServiceLocation/postData",
  async ({ locationData }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/serviceLocation`,
        locationData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateServiceLocationData = createAsyncThunk(
  "updateServiceLocation/updateData",
  async ({ id, data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/serviceLocation/${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteServiceLocationData = createAsyncThunk(
  "deleteServiceLocation/updateData",
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/serviceLocation/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Create the Redux Toolkit slice
const postServiceLocationSlice = createSlice({
  name: "postServiceLocation",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
    dataupdate: null,
    loadingupdate: false,
    errorupdate: null,
    successupdate: null,
  },
  reducers: {
    resetData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
      state.error = null; // Reset error to null
      state.success = null;
      state.dataupdate = null; // Reset the data to null or initial state
      state.loadingupdate = false; // Reset loading to false
      state.errorupdate = null; // Reset error to null
      state.successupdate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postServiceLocationData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postServiceLocationData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Form Submitted Successfully";
      })
      .addCase(postServiceLocationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; // Access the error message from the payload
      })
      .addCase(updateServiceLocationData.pending, (state) => {
        state.loadingupdate = true;
        state.errorupdate = null;
      })
      .addCase(updateServiceLocationData.fulfilled, (state, action) => {
        state.dataupdate = action.payload;
        state.loadingupdate = false;
        state.errorupdate = null;
        state.successupdate = "Form Updated Successfully";
      })
      .addCase(updateServiceLocationData.rejected, (state, action) => {
        state.loadingupdate = false;
        state.errorupdate = action?.payload?.message;
      })
      .addCase(deleteServiceLocationData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteServiceLocationData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Form Deleted Successfully";
      })
      .addCase(deleteServiceLocationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      });
  },
});
export const { resetData } = postServiceLocationSlice.actions; // Export the clearData action

export default postServiceLocationSlice.reducer;
