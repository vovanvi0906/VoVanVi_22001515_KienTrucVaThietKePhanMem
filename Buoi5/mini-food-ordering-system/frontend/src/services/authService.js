import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_USER_API || "/user-api",
});

const unwrapResponse = (response) => response.data?.data ?? response.data;

export const loginUserRequest = async (payload) => {
  const response = await authApi.post("/api/users/login", payload);
  return unwrapResponse(response);
};

export const registerUserRequest = async (payload) => {
  const response = await authApi.post("/api/users/register", payload);
  return unwrapResponse(response);
};

export default authApi;
