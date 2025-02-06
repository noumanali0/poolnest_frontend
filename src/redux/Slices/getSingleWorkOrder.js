import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getSingleWorkOrderSlice = createSlice({
  name: "getSingleWorkOrder",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetSingleWorkOrder.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchgetSingleWorkOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchgetSingleWorkOrder.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchgetSingleWorkOrderDetail.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchgetSingleWorkOrderDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchgetSingleWorkOrderDetail.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default getSingleWorkOrderSlice.reducer;

export const fetchgetSingleWorkOrder = createAsyncThunk(
  "/getSingleWorkOrder/fetch",
  async ({ id }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/workOrder/${id}`,
      config
    );
    const workOrder = res.data.result;
    return workOrder;
  }
);


export const fetchgetSingleWorkOrderDetail = createAsyncThunk(
  "/getSingleWorkOrderDetails/fetch",
  async ({id, seerviceid}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/RouteAssignment/SingleWorkOrder/${id}/${seerviceid}`,
        config
    );
    const workOrder = res.data;
    return workOrder;
  }
);
