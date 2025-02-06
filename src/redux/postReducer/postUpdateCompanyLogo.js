import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = `${process.env.REACT_APP_API_URL}/SuperAdmin/Update/CompanyLogo`;

// Define the async thunk for posting customer data

export const UpdateCompanyLogo = createAsyncThunk(
    "superadmin/UpdateCompanyLogo",
    async (values , { rejectWithValue }) => {
      const token = Cookies.get("userToken");
  
      const config = {
        headers: {
          Authorization: token,
        },
      };
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/SuperAdmin/Update/CompanyLogo`,
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
const UpdateCompanyLogoSlice = createSlice({
  name: "UpdateCompanyLogo",
  initialState: {
    data: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UpdateCompanyLogo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateCompanyLogo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.message = "success";
      })
      .addCase(UpdateCompanyLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Access the error message from the payload
      });
  },
});

export default UpdateCompanyLogoSlice.reducer;
