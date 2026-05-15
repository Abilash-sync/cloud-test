package com.codestudio.login.service;

import com.codestudio.login.dto.LoginRequest;
import com.codestudio.login.dto.LoginResponse;
import com.codestudio.login.dto.RegisterRequest;
import com.codestudio.login.dto.UserDTO;
import com.codestudio.login.model.User;
import com.codestudio.login.repository.UserRepository;
import com.codestudio.login.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * User service for authentication and user management
 */
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Register a new user
     */
    public LoginResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return LoginResponse.builder()
                    .success(false)
                    .message("Email already registered")
                    .build();
        }

        // Validate input
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return LoginResponse.builder()
                    .success(false)
                    .message("Email is required")
                    .build();
        }

        if (request.getPassword() == null || request.getPassword().length() < 6) {
            return LoginResponse.builder()
                    .success(false)
                    .message("Password must be at least 6 characters")
                    .build();
        }

        // Create new user
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName() != null ? request.getFirstName() : "")
                .lastName(request.getLastName() != null ? request.getLastName() : "")
                .active(true)
                .build();

        user = userRepository.save(user);

        // Generate token
        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getId());

        return LoginResponse.builder()
                .success(true)
                .message("User registered successfully")
                .token(token)
                .user(UserDTO.fromUser(user))
                .build();
    }

    /**
     * Authenticate user with email and password
     */
    public LoginResponse authenticate(LoginRequest request) {
        // Validate input
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return LoginResponse.builder()
                    .success(false)
                    .message("Email is required")
                    .build();
        }

        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return LoginResponse.builder()
                    .success(false)
                    .message("Password is required")
                    .build();
        }

        // Find user by email
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return LoginResponse.builder()
                    .success(false)
                    .message("Invalid email or password")
                    .build();
        }

        User user = userOpt.get();

        // Check if user is active
        if (!user.getActive()) {
            return LoginResponse.builder()
                    .success(false)
                    .message("Account is disabled")
                    .build();
        }

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return LoginResponse.builder()
                    .success(false)
                    .message("Invalid email or password")
                    .build();
        }

        // Generate token
        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getId());

        return LoginResponse.builder()
                .success(true)
                .message("Login successful")
                .token(token)
                .user(UserDTO.fromUser(user))
                .build();
    }

    /**
     * Get user by email
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Get user by ID
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Verify JWT token
     */
    public Boolean verifyToken(String token) {
        return jwtTokenProvider.validateToken(token);
    }

    /**
     * Get user from token
     */
    public Optional<User> getUserFromToken(String token) {
        try {
            if (verifyToken(token)) {
                Long userId = jwtTokenProvider.getUserIdFromToken(token);
                return getUserById(userId);
            }
        } catch (Exception e) {
            // Token validation failed
        }
        return Optional.empty();
    }
}
