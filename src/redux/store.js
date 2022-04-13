import { configureStore } from '@reduxjs/toolkit';
import messageSlice from './messageSlice';
import chatBotSlice from './chatBotSlice';

export const store = configureStore({
  reducer: {
    message: messageSlice,
    chatBot: chatBotSlice,
  },
});
