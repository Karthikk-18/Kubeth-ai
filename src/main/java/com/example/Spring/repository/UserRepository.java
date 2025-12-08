package com.example.Spring.repository;

import com.example.Spring.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
      UserEntity findByEmail(String email);
}
