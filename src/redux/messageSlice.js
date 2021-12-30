import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messageApi from '../apis/message';

const initialState = {
  listQandA: [],
  isLoadding: false,
};

export const sendMessage = createAsyncThunk(
  '/message/sendMessage',
  async (params) => {
    const response = await messageApi.sendMessage(params);
    return response;
  }
);

export const messageSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    question: (state, { payload }) => {
      console.log({ title: payload, type: 'question' });
      state.listQandA.push({ title: payload, type: 'question' });
      if (state.listQandA.length > 0) {
        state.listQandA = state.listQandA.map((qandA) => ({
          ...qandA,
          active: false,
        }));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(sendMessage.fulfilled, (state, { payload }) => {
        state.isLoadding = false;
        console.log('payload: ', payload);

        state.listQandA.push({ ...payload, type: 'answer', active: true });
      });
  },
});

// Action creators are generated for each case reducer function
export const { question } = messageSlice.actions;

export default messageSlice.reducer;
