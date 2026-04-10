package com.foodorder.food_service.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoodRequest {

    @NotBlank(message = "Food name must not be blank")
    private String name;

    private String description;

    @NotNull(message = "Price must not be null")
    @DecimalMin(value = "0.01", inclusive = true, message = "Price must be greater than 0")
    private BigDecimal price;

    @NotBlank(message = "Category must not be blank")
    private String category;

    private String imageUrl;

    @NotNull(message = "Available must not be null")
    private Boolean available;
}
