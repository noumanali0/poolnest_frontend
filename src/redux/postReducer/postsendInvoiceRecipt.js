import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Define the async thunk for posting itemType data
export const sendInvoiceRecipt = createAsyncThunk(
  "sendInvoiceRecipt/postData",
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    const values =""

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/InvoicingPaymentHistory/sendInvoiceRecipt/${id}`,
        values,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const sendInvoiceReciptSlice = createSlice({
  name: "sendInvoiceRecipt",
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
      .addCase(sendInvoiceRecipt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendInvoiceRecipt.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(sendInvoiceRecipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { clearData } = sendInvoiceReciptSlice.actions;
export default sendInvoiceReciptSlice.reducer;
