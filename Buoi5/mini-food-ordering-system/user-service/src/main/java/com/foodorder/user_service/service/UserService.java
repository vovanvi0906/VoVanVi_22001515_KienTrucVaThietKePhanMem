package com.foodorder.user_service.service;

import com.foodorder.user_service.dto.LoginRequest;
import com.foodorder.user_service.dto.RegisterRequest;
import com.foodorder.user_service.dto.UserResponse;
import java.util.List;

public interface UserService {

    UserResponse register(RegisterRequest request);

    UserResponse login(LoginRequest request);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);
}
