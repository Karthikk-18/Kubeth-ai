package com.backend.demo.controller;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class AuthController {

    @GetMapping("/auth/user")
    public Map<String, Object> getUser(OAuth2User user) {
        return user == null ? Map.of("authenticated", false) : Map.of(
                "authenticated", true,
                "name", user.getAttribute("name"),
                "email", user.getAttribute("email"),
                "provider", user.getAttribute("iss") != null ? "google" : "github"
        );
    }
}

