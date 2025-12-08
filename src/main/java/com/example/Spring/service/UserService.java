package com.example.Spring.service;

import com.example.Spring.Dto.UserDto;
import com.example.Spring.entity.UserEntity;

import java.util.List;

public interface UserService {
    UserDto signUp(UserDto dto);
    String login(String email, String password);
}
