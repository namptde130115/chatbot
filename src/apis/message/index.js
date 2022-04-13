import axiosClient from '../axios';

const messageApi = {
  getTheme: () => {
    const url = '/bot-manager/62554f74c5f9ba001d93fc31/tenants/design';
    return axiosClient.get(url);
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
