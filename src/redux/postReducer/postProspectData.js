import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const postProspectData = createAsyncThunk(
  "postProspectData/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/prospect`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postConvertProspectData = createAsyncThunk(
  "postConvertProspectData/postData",
  async ({ Data, id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/prospect/convertCustomer/${id}`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postconvertServiceLocation = createAsyncThunk(
  "postconvertServiceLocation/postData",
  async ({ Data, id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/prospect/convertServiceLocation/${id}`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const PreAppointmentProspect = createAsyncThunk(
  "PreAppointmentProspect/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/prospect/PreAppointmentProspect`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const PreAppointmentEmailProspect = createAsyncThunk(
  "PreAppointmentEmailProspect/postData",
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/prospect/PreAppointmentProspectById/${id}`,
        id,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const PreAppointmentQuoteProspect = createAsyncThunk(
  "PreAppointmentQuoteProspect/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/prospect/ProspectQuote`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const PreAppointmentQuoteEmailProspect = createAsyncThunk(
  "PreAppointmentQuoteEmailProspect/postData",
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/prospect/ProspectQuoteById/${id}`,
        id,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProspectData = createAsyncThunk(
  "updateProspectData/postData",
  async ({ Data, id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/prospect/${id}`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postProspectDataSlice = createSlice({
  name: "postProspectData",
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
      .addCase(postProspectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postProspectData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postProspectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      })
      .addCase(postConvertProspectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postConvertProspectData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postConvertProspectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      })
      .addCase(postconvertServiceLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postconvertServiceLocation.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postconvertServiceLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      })
      .addCase(updateProspectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProspectData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Úpdate Successfully";
      })
      .addCase(updateProspectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      })
      .addCase(PreAppointmentEmailProspect.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PreAppointmentEmailProspect.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Email Sent Successfully";
      })
      .addCase(PreAppointmentEmailProspect.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      })

      .addCase(PreAppointmentQuoteProspect.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PreAppointmentQuoteProspect.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Email Sent Successfully";
      })
      .addCase(PreAppointmentQuoteProspect.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      })

      .addCase(PreAppointmentQuoteEmailProspect.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PreAppointmentQuoteEmailProspect.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Email Sent Successfully";
      })
      .addCase(PreAppointmentQuoteEmailProspect.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      })

      .addCase(PreAppointmentProspect.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PreAppointmentProspect.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Email Sent Successfully";
      })
      .addCase(PreAppointmentProspect.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      });
  },
});
export const { clearData } = postProspectDataSlice.actions;
export default postProspectDataSlice.reducer;
