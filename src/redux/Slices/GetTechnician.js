import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { card } from "../../Data/Data";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getGetTechnician = createSlice({
  name: "Technician",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTechnician.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchTechnician.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchTechnician.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default getGetTechnician.reducer;

export const fetchTechnician = createAsyncThunk(
  "/userget/fetch",
  async ({ name, email, status, statusActive, page } = {}) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      // user_type: "Technician",
      ...(name && { first_name: name }),
      ...(email && { email }),
      ...(status && { user_type: status }),
      ...(statusActive && { is_active: statusActive }),
      ...(page && { page }),
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user?size=1000`,
      {
        params: queryParams,
        headers: config,
      }
    );

    const TechnicianData = res.data.result;
    return TechnicianData;
  }
);
