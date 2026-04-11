import axios from "axios";

const foodApi = axios.create({
  baseURL: import.meta.env.VITE_FOOD_API || "/food-api",
});

export const getFoods = async () => {
  const response = await foodApi.get("/foods");
  return response.data;
};

export const getFoodById = async (id) => {
  const response = await foodApi.get(`/foods/${id}`);
  return response.data;
};

export const createFoodRequest = async (payload) => {
  const response = await foodApi.post("/foods", payload);
  return response.data;
};

export const updateFoodRequest = async (id, payload) => {
  const response = await foodApi.put(`/foods/${id}`, payload);
  return response.data;
};

export const deleteFoodRequest = async (id) => {
  const response = await foodApi.delete(`/foods/${id}`);
  return response.data;
};

export default foodApi;
