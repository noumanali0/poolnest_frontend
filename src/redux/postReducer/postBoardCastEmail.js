import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting itemType data
export const postBoardEmail = createAsyncThunk(
  "postBoardEmail/postData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/emails/sendBroadCastEmail`,
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
const postBoardEmailSlice = createSlice({
  name: "postBoardEmail",
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
      state.success= null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postBoardEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postBoardEmail.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postBoardEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
  },
});
export const { clearData } = postBoardEmailSlice.actions;
export default postBoardEmailSlice.reducer;
