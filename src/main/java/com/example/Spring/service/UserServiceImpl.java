package com.example.Spring.service;

import com.example.Spring.Dto.UserDto;
import com.example.Spring.Security.JwtService;
import com.example.Spring.exception.ResourceNotFoundException;
import com.example.Spring.repository.UserRepository;
import com.example.Spring.entity.UserEntity;
import com.example.Spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
   private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Override
    public UserDto signUp(UserDto dto) {
        if(repo.findByEmail(dto.getEmail()) != null){
            throw new RuntimeException("Email Already Registered");
        }

        UserEntity user = new UserEntity();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        UserEntity saved = repo.save(user);

        UserDto response = new UserDto();

        response.setId(saved.getId());
        response.setName(saved.getName());
        response.setEmail(saved.getEmail());

        return response;
    }

    @Override
    public String login(String email, String password) {

        UserEntity user = repo.findByEmail(email);

        if (user == null) {
            return "Email not found!";
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return "Wrong password!";
        }

        return jwtService.generateToken(email);
    }

}
