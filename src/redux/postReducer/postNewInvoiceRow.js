import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const postInvoiceRowData = createAsyncThunk(
  "postInvoiceRow/postData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/EditInvoice/AddNew`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const putInvoiceEditData = createAsyncThunk(
  "putInvoiceEditData/putData",
  async ({ id , values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/EditInvoice/${id}`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const putInvoiceDosageEditData = createAsyncThunk(
  "putInvoiceDosageEditData/putData",
  async ({ id , values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/EditInvoice/editdosages/${id}`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const putInvoiceItemEditData = createAsyncThunk(
  "putInvoiceItemEditData/putData",
  async ({ id , values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/EditInvoice/edititem/${id}`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMiscellaneousInvoice = createAsyncThunk(
  "deleteMiscellaneousInvoice/deleteData",
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/EditInvoice/DeleteMiscellaneousInvoice/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postInvoiceRowSlice = createSlice({
  name: "postInvoiceRow",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
    newsuccess : null,
    dosagesuccess : null,
    itemsuccess : null,
    itemerror : null,
    deleteMiscellaneousLoading: false,
    deleteMiscellaneousSuccess: false,
    deleteMiscellaneousError: null
  },
  reducers: {
    resetData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
      state.error = null; // Reset error to null
      state.success = false;
      state.newsuccess = false;
      state.dosagesuccess = false;
      state.itemsuccess = false;
      state.itemerror = false;
      state.deleteMiscellaneousLoading = false;
      state.deleteMiscellaneousSuccess = false;
      state.deleteMiscellaneousError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postInvoiceRowData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postInvoiceRowData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(postInvoiceRowData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(putInvoiceEditData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putInvoiceEditData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.newsuccess = true;
      })
      .addCase(putInvoiceEditData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(putInvoiceDosageEditData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putInvoiceDosageEditData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.dosagesuccess = true;
      })
      .addCase(putInvoiceDosageEditData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(putInvoiceItemEditData.pending, (state) => {
        state.loading = true;
        state.itemerror = null;
      })
      .addCase(putInvoiceItemEditData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.itemerror = null;
        state.itemsuccess = true;
      })
      .addCase(putInvoiceItemEditData.rejected, (state, action) => {
        state.loading = false;
        state.itemerror = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(deleteMiscellaneousInvoice.pending,  (state, action) => {
        state.deleteMiscellaneousLoading = true;
        state.deleteMiscellaneousError = null;
      })
      .addCase(deleteMiscellaneousInvoice.fulfilled,  (state, action) => {
        state.deleteMiscellaneousLoading = false;
        state.deleteMiscellaneousError = null;
        state.deleteMiscellaneousSuccess = true;
      })
      .addCase(deleteMiscellaneousInvoice.rejected,  (state, action) => {
        state.deleteMiscellaneousLoading = false;
        state.deleteMiscellaneousError = action?.payload?.message; // Access the error message from the payload
        state.deleteMiscellaneousSuccess = false;
      })

  },
});
export const { resetData } = postInvoiceRowSlice.actions; // Export the clearData action

export default postInvoiceRowSlice.reducer;
