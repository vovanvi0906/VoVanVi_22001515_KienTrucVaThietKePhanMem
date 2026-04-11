import {
  createFoodRequest,
  deleteFoodRequest,
  getFoodById,
  getFoods,
  updateFoodRequest,
} from "../api/foodApi";

export const getAllFoods = () => getFoods();

export const getFoodDetail = (id) => getFoodById(id);

export const createFood = (payload) => createFoodRequest(payload);

export const updateFood = (id, payload) => updateFoodRequest(id, payload);

export const deleteFood = (id) => deleteFoodRequest(id);
