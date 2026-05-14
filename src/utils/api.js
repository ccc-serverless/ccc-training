import axios from "axios";
import axiosRetry from "axios-retry";
import config from "config/config";

axiosRetry(axios, { retries: 3 });

axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response.status === 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }

    return Promise.reject(error);
  }
);

export const postRequest = (path, data) => {
  return axios.post(`${config.apiBaseUrl}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const putRequest = (path, data) => {
  return axios.put(`${config.apiBaseUrl}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const getRequest = (path) => {
  return axios.get(`${config.apiBaseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const headRequest = (path) => {
  return axios.head(`${config.apiBaseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const multiGetRequest = async (paths) => {
  let arr = [];

  paths.forEach((item) => {
    arr.push(
      axios.get(`${config.apiBaseUrl}${item}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
    );
  });
  return axios.all(arr);
};

export const multiPostRequest = async (configs) => {
  let arr = [];
  const authToken = localStorage.getItem("authToken");
  configs.forEach((item) => {
    arr.push(
      axios.post(`${config.apiBaseUrl}${item.url}`, item.data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    );
  });
  return axios.all(arr);
};
