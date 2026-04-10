package com.foodorder.user_service.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    USER,
    ADMIN;

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static Role fromValue(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Role must be USER or ADMIN");
        }

        for (Role role : values()) {
            if (role.name().equalsIgnoreCase(value.trim())) {
                return role;
            }
        }

        throw new IllegalArgumentException("Role must be USER or ADMIN");
    }

    @JsonValue
    public String toValue() {
        return name();
    }
}
