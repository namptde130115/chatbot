import axiosClient from '../axios';

const chatBotApi = {
  startChat: (body) => {
    const url = '/widget/startChat';
    return axiosClient.post(url, body);
  },
};

export default chatBotApi;
