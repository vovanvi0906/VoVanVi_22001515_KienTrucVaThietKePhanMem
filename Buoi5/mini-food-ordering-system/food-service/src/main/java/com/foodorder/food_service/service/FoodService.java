package com.foodorder.food_service.service;

import com.foodorder.food_service.dto.FoodRequest;
import com.foodorder.food_service.dto.FoodResponse;
import java.util.List;

public interface FoodService {

    List<FoodResponse> getAllFoods();

    FoodResponse getFoodById(Long id);

    FoodResponse createFood(FoodRequest request);

    FoodResponse updateFood(Long id, FoodRequest request);

    void deleteFood(Long id);
}
