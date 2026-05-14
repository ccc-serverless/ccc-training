import { postRequest, putRequest } from "./requests";

export function login({ username, password }) {
  return postRequest("/auth/login", { username, password });
}

export function UpdatePassword({ password }) {
  return putRequest("/auth/password", { password });
}

export function refreshToken() {
  return postRequest("/auth/token", { token: localStorage.getItem("authToken") });
}
