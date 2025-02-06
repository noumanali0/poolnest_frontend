import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Define the async thunk for posting customer data

export const postReason = createAsyncThunk(
  "postReason/postData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/SkipReason`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateReason = createAsyncThunk(
  "UpdateReason/updateData",
  async ({ id, values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/SkipReason/${id}`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeleteReason = createAsyncThunk(
  "DeleteReason/deleteData",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("userToken");
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const response = await axios.request({
        url: `${process.env.REACT_APP_API_URL}/SkipReason/${id}`,
        method: "delete",
        headers: config.headers,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postReasonSlice = createSlice({
  name: "postReasonSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
      state.error = null; // Reset error to null
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(postReason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReason.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postReason.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(UpdateReason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateReason.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdateReason.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(DeleteReason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteReason.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(DeleteReason.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { resetData } = postReasonSlice.actions; // Export the clearData action

export default postReasonSlice.reducer;
