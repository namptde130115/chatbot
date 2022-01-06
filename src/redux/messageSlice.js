import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messageApi from '../apis/message';

const initialState = {
  breadCrumbs: [],
  listQandA: [],
  listMainQandA: [],
  currentQandA: {},
  isLoadding: false,
};

export const sendMessage = createAsyncThunk(
  '/message/sendMessage',
  async (params) => {
    const response = await messageApi.sendMessage(params);
    return response;
  }
);

export const startChat = createAsyncThunk('/chat/startChat', async (params) => {
  const response = await messageApi.startChat(params);
  return response.data;
});

export const getMessage = createAsyncThunk(
  '/chat/getMessage',
  async (params) => {
    const response = await messageApi.getMessage({ ...params });
    return response.data;
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
    questionMain: (state, { payload }) => {
      console.log({ title: payload, type: 'question' });
      state.listMainQandA.push({ title: payload, type: 'question' });
      if (state.listMainQandA.length > 0) {
        state.listMainQandA = state.listMainQandA.map((qandA) => ({
          ...qandA,
          active: false,
        }));
      }
      if (payload.includes('<')) {
        let total = payload.length + 1;
        for (let i = 0; i < total; i++) {
          state.breadCrumbs.pop();
        }
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
      })
      .addCase(startChat.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(startChat.fulfilled, (state, { payload }) => {
        state.isLoadding = false;
        console.log('payload main: ', payload);
        // let regex = /\d+/g;
        const questionTitle = payload.contents[0].question.split('\n');
        questionTitle.shift();
        console.log('a: ', questionTitle.join());
        // let finalTitle = payload.contents[0].question.join();
        const total = payload.contents[0].question
          .split(')')[0]
          .replace(/[^0-9]/g, '');
        state.breadCrumbs.push(`すべて (${total})`);
        state.listMainQandA.push({
          breadCrumbs: state.breadCrumbs,
          chatId: payload.chatId,
          questionTitle: questionTitle.join(),
          questions: payload.contents[0].questions,
          navigateOptions: payload.contents[0].navigateOptions,
          messageOptionsRow: payload.contents[0].options,
          stateButtons: payload.contents[0].stateButtons,
          type: 'answer',
          active: true,
        });
        state.currentQandA = payload;
      })
      .addCase(getMessage.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getMessage.fulfilled, (state, { payload }) => {
        state.isLoadding = false;
        console.log('payload: ', payload);
        if (payload.contents.length > 1) {
          const questionTitle = payload.contents[1].question.split('\n');
          // const nextBreadcumbs = questionTitle.shift();
          console.log(
            'questionTitle: ',
            payload.contents[1].question.split('\n')
          );

          // const total = payload.contents[0].question
          //   .split(')')[0]
          //   .replace(/[^0-9]/g, '');
          // let lastBreadCrumb = state.breadCrumbs.pop();
          // let newLastBreadCrumb = lastBreadCrumb.split(' ')[0];
          // state.breadCrumbs.push(newLastBreadCrumb);
          // state.breadCrumbs.push(
          //   `${nextBreadcumbs.split(' ').shift()} (${total})`
          // );

          let arrOptions = [];
          if (payload.contents[1].optGroup) {
            for (let i = 0; i < payload.contents[0].options.length; i++) {
              arrOptions.push({
                title: payload.contents[0].optGroup[i],
                value: payload.contents[0].options[i],
              });
            }
          } else {
            arrOptions = ['はい', 'いいえ'];
          }

          let splitQandA = payload.contents[0].text.split('\n\n');
          console.log('splitQandA', splitQandA);
          let listQandA = [];
          for (let i = 0; i < splitQandA.length; i++) {
            listQandA.push({
              title: splitQandA[i].split('\n')[0],
              value: splitQandA[i].split('\n')[1],
            });
          }
          state.listMainQandA.push(
            {
              listQandA: listQandA,
              isQA: payload.contents[0].isQA,
              active: true,
            },
            {
              // breadCrumbs: state.breadCrumbs,
              optGroup: payload.contents[1].optGroup ? true : false,
              chatId: payload.chatId,
              questionTitle: questionTitle.join(),
              questions: payload.contents[1].questions,
              navigateOptions: payload.contents[1].navigateOptions,
              messageOptionsRow:
                arrOptions.length === 0
                  ? payload.contents[1].options
                  : arrOptions,
              stateButtons: payload.contents[1].stateButtons,
              type: 'answer',
              active: true,
              ...payload.contents[1],
            }
          );
        } else {
          const questionTitle = payload.contents[0].question.split('\n');
          const nextBreadcumbs = questionTitle.shift();
          console.log('a: ', questionTitle.join());

          const total = payload.contents[0].question
            .split(')')[0]
            .replace(/[^0-9]/g, '');
          if (state.breadCrumbs.length === 0) {
            state.breadCrumbs = [`すべて (${total})`];
          } else {
            let lastBreadCrumb = state.breadCrumbs.pop();
            let newLastBreadCrumb = lastBreadCrumb?.split(' ')[0] || [];
            state.breadCrumbs.push(newLastBreadCrumb);
            state.breadCrumbs.push(
              `${nextBreadcumbs
                .split(' ')
                .shift()
                .split('>')
                .slice(-1)} (${total})`
            );
          }

          let arrOptions = [];
          if (payload.contents[0].optGroup) {
            for (let i = 0; i < payload.contents[0].options.length; i++) {
              arrOptions.push({
                title: payload.contents[0].optGroup[i],
                value: payload.contents[0].options[i],
              });
            }
          }

          state.listMainQandA.push({
            breadCrumbs: state.breadCrumbs,
            optGroup: payload.contents[0].optGroup ? true : false,
            chatId: payload.chatId,
            questionTitle: questionTitle.join(),
            questions: payload.contents[0].questions,
            navigateOptions: payload.contents[0].navigateOptions,
            messageOptionsRow:
              arrOptions.length === 0
                ? payload.contents[0].options
                : arrOptions,
            stateButtons: payload.contents[0].stateButtons,
            type: 'answer',
            active: true,
            ...payload.contents[0],
          });
        }

        state.currentQandA = payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { question, questionMain } = messageSlice.actions;

export default messageSlice.reducer;
