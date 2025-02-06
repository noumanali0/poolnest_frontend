import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const QBOUpdateSyncingData = createAsyncThunk(
  "QBOUpdateSyncing/postData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/SuperAdminQuickBook/UpdateSyncing`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const QBOUpdateSyncingSlice = createSlice({
  name: "QBOUpdateSyncing",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null
  },
  reducers: {
    resetData: (state) => {
      state.data = null; 
      state.loading = false;
      state.error = null;
      state.success = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(QBOUpdateSyncingData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null
      })
      .addCase(QBOUpdateSyncingData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Updated Successfully"
      })
      .addCase(QBOUpdateSyncingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; 
        state.success = null
      });
  },
});
export const { resetData } = QBOUpdateSyncingSlice.actions;

export default QBOUpdateSyncingSlice.reducer;
