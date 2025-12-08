package com.example.Spring.controller;

import java.util.*;
import com.example.Spring.Dto.UserDto;
import com.example.Spring.entity.UserEntity;
import com.example.Spring.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

@RestController
@RequestMapping("/auth")
public class AuthController{

    @Autowired
    private UserService userService;

    @GetMapping("/secure")
    public ResponseEntity<String> secureEndpoint() {
        return ResponseEntity.ok("🔥 JWT Verified — You are authorized!");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserDto dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.signUp(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> loginData){
        String email = loginData.get("email");
        String password = loginData.get("password");

        String result = userService.login(email,password);

        return ResponseEntity.ok(result);
    }
}
