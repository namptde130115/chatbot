import axiosClient from '../axios';
import { theme } from '../mock/theme';

const messageApi = {
  getTheme: () => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(theme),
        1000
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
