import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 1 });
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

function getAuthToken() {
  return localStorage.getItem("authToken");
}

export const postRequest = (path, data) => {
  return axios.post(`${BASE_URL}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};

export const putRequest = (path, data) => {
  return axios.put(`${BASE_URL}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};

export const getRequest = (path) => {
  return axios.get(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};

export const headRequest = (path) => {
  return axios.head(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const multiGetRequest = async (paths) => {
  let arr = [];

  paths.forEach((item) => {
    arr.push(
      axios.get(`${BASE_URL}${item}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
    );
  });
  return axios.all(arr);
};

export const multiPostRequest = async (configs) => {
  let arr = [];
  const authToken = getAuthToken();
  configs.forEach((item) => {
    arr.push(
      axios.post(`${BASE_URL}${item.url}`, item.data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    );
  });
  return axios.all(arr);
};
