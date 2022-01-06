import axiosClient from '../axios';

const messageApi = {
  sendMessage: () => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            type: 'answer',
            breadCrumbs: [
              'Breadcrumb 1',
              'Breadcrumb 2',
              'Breadcrumb 3',
              'Breadcrumb 4',
              'Breadcrumb 5',
            ],
            questionTitle: 'What would you like to do?',
            messageOptionsCol: [
              {
                message: 'hello world, and you',
                color: 'red',
              },
              {
                message: 'hello world, and you will',
                color: 'blue',
              },
              {
                message: 'hello world',
                color: 'green',
              },
              {
                message: 'hello world',
                color: 'green',
              },
            ],
            listAnswer: [
              'asdasdasdasd',
              'asdasdasdasd',
              'asdasdasdasdasd',
              'asdasdasdasd',
            ],
          }),
        2000
      );
    });
  },
  getMessage: (params) => {
    const url = '/new%20message';
    return axiosClient.post(url, params);
  },
  startChat: (params) => {
    const url = '/start%20chat';
    return axiosClient.post(url, params);
  },
};

export default messageApi;
