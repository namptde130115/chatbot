import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messageApi from '../apis/message';

const initialState = {
  breadCrumbs: [],
  listQandA: [],
  listMainQandA: [],
  currentQandA: {},
  isLoadding: false,
  theme: {},
};

export const sendMessage = createAsyncThunk(
  '/message/sendMessage',
  async (params) => {
    const response = await messageApi.sendMessage(params);
    return response;
  }
);

export const getTheme = createAsyncThunk(
  '/theme/getTheme',
  async (params, { rejectWithValue }) => {
    try {
      const response = await messageApi.getTheme();
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const startChat = createAsyncThunk('/chat/startChat', async (params) => {
  const response = await messageApi.startChat(params);
  return response.data;
});

export const messageSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTheme.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getTheme.fulfilled, (state, { payload }) => {
        state.isLoadding = false;
        console.log('payload: ', payload);
        state.theme = payload.widget;
      });
  },
});

// Action creators are generated for each case reducer function
export const { question, questionMain } = messageSlice.actions;

export default messageSlice.reducer;
