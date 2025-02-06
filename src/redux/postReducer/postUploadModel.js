import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const UploadModelData = createAsyncThunk(
  "UploadModel/postData",
  async ({ formData }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Import/ImportData`,
        formData,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UploadModelDataEquitment = createAsyncThunk(
  "UploadModelDataEquitment/postData",
  async ({ formData }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Import/ImportEquipmentData`,
        formData,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UploadModelDataReading = createAsyncThunk(
  "UploadModelDataReading/postData",
  async ({ formData }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Import/ImportReadingsData`,
        formData,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UploadModelDataDosage = createAsyncThunk(
  "UploadModelDataDosage/postData",
  async ({ formData }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Import/ImportDosagesData`,
        formData,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const UploadModelSlice = createSlice({
  name: "UploadModel",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
    dataEquitment: null,
    loadingEquitment: false,
    errorEquitment: null,
    successEquitment: null,
    dataDosage: null,
    loadingDosage: false,
    errorDosage: null,
    successDosage: null,
    dataReading: null,
    loadingReading: false,
    errorReading: null,
    successReading: null,
  },
  reducers: {
    resetData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
      state.error = null; // Reset error to null
      state.success = null;
      state.dataEquitment = null;
      state.loadingEquitment = false;
      state.errorEquitment = null;
      state.successEquitment = null;
      state.dataDosage = null;
      state.loadingDosage = false;
      state.errorDosage = null;
      state.successDosage = null;
      state.dataReading = null;
      state.loadingReading = false;
      state.errorReading = null;
      state.successReading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UploadModelData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(UploadModelData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Import is successful";
      })
      .addCase(UploadModelData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
        state.success = null;
      })

      .addCase(UploadModelDataEquitment.pending, (state) => {
        state.loadingEquitment = true;
        state.errorEquitment = null;
        state.successEquitment = null;
      })
      .addCase(UploadModelDataEquitment.fulfilled, (state, action) => {
        state.dataEquitment = action.payload;
        state.loadingEquitment = false;
        state.errorEquitment = null;
        state.successEquitment = "Import is successful";
      })
      .addCase(UploadModelDataEquitment.rejected, (state, action) => {
        state.loadingEquitment = false;
        state.errorEquitment = action?.payload?.message; // Access the error message from the payload
        state.successEquitment = null;
      })

      .addCase(UploadModelDataReading.pending, (state) => {
        state.loadingReading = true;
        state.errorReading = null;
        state.successReading = null;
      })
      .addCase(UploadModelDataReading.fulfilled, (state, action) => {
        state.dataReading = action.payload;
        state.loadingReading = false;
        state.errorReading = null;
        state.successReading = "Import is successful";
      })
      .addCase(UploadModelDataReading.rejected, (state, action) => {
        state.loadingReading = false;
        state.errorReading = action?.payload?.message; // Access the error message from the payload
        state.successReading = null;
      })

      .addCase(UploadModelDataDosage.pending, (state) => {
        state.loadingDosage = true;
        state.errorDosage = null;
        state.successDosage = null;
      })
      .addCase(UploadModelDataDosage.fulfilled, (state, action) => {
        state.dataDosage = action.payload;
        state.loadingDosage = false;
        state.errorDosage = null;
        state.successDosage = "Import is successful";
      })
      .addCase(UploadModelDataDosage.rejected, (state, action) => {
        state.loadingDosage = false;
        state.errorDosage = action?.payload?.message; // Access the error message from the payload
        state.successDosage = null;
      });
  },
});
export const { resetData } = UploadModelSlice.actions; // Export the clearData action

export default UploadModelSlice.reducer;
