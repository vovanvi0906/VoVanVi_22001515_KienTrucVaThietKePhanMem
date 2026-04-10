package com.foodorder.food_service.repository;

import com.foodorder.food_service.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
