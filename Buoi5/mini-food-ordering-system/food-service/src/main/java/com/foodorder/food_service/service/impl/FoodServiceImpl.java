package com.foodorder.food_service.service.impl;

import com.foodorder.food_service.dto.FoodRequest;
import com.foodorder.food_service.dto.FoodResponse;
import com.foodorder.food_service.entity.Food;
import com.foodorder.food_service.exception.ResourceNotFoundException;
import com.foodorder.food_service.repository.FoodRepository;
import com.foodorder.food_service.service.FoodService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;

    @Override
    public List<FoodResponse> getAllFoods() {
        return foodRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public FoodResponse getFoodById(Long id) {
        Food food = findFoodById(id);
        return toResponse(food);
    }

    @Override
    @Transactional
    public FoodResponse createFood(FoodRequest request) {
        Food food = Food.builder().build();
        mapRequestToEntity(request, food);
        return toResponse(foodRepository.save(food));
    }

    @Override
    @Transactional
    public FoodResponse updateFood(Long id, FoodRequest request) {
        Food food = findFoodById(id);
        mapRequestToEntity(request, food);
        return toResponse(foodRepository.save(food));
    }

    @Override
    @Transactional
    public void deleteFood(Long id) {
        Food food = findFoodById(id);
        foodRepository.delete(food);
    }

    private Food findFoodById(Long id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + id));
    }

    private void mapRequestToEntity(FoodRequest request, Food food) {
        // Trim text fields so the data saved in DB is cleaner.
        food.setName(request.getName().trim());
        food.setDescription(normalizeOptionalText(request.getDescription()));
        food.setPrice(request.getPrice());
        food.setCategory(request.getCategory().trim());
        food.setImageUrl(normalizeOptionalText(request.getImageUrl()));
        food.setAvailable(request.getAvailable());
    }

    private String normalizeOptionalText(String value) {
        if (value == null) {
            return null;
        }

        String trimmedValue = value.trim();
        return trimmedValue.isEmpty() ? null : trimmedValue;
    }

    private FoodResponse toResponse(Food food) {
        return FoodResponse.builder()
                .id(food.getId())
                .name(food.getName())
                .description(food.getDescription())
                .price(food.getPrice())
                .category(food.getCategory())
                .imageUrl(food.getImageUrl())
                .available(food.getAvailable())
                .build();
    }
}
