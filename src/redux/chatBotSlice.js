import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import chatBotApi from '../apis/chat';

const initialState = {
  listScenario: [],
  isStart: false,
  breadCrumbs: [],
  listQandA: [],
  listMainMessage: [],
  currentMessage: {},
  isLoadding: false,
  theme: {},
};

export const startChat = createAsyncThunk(
  '/chat/startChat',
  async (params, { rejectWithValue }) => {
    try {
      const response = await chatBotApi.startChat(params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatBotSlice = createSlice({
  name: 'chatBot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startChat.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(startChat.fulfilled, (state, { payload }) => {
        state.isLoadding = false;
        console.log('payload: ', payload);
        state.listScenario = payload;
      });
  },
});

export default chatBotSlice.reducer;
