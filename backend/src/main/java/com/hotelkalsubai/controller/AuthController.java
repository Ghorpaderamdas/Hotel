package com.hotelkalsubai.controller;

import com.hotelkalsubai.dto.*;
import com.hotelkalsubai.entity.Admin;
import com.hotelkalsubai.security.JwtUtils;
import com.hotelkalsubai.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private AdminService adminService;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtils.generateToken(userDetails);
            
            Admin admin = adminService.findByUsername(loginRequest.getUsername()).orElseThrow();
            adminService.updateLastLogin(admin.getId());
            
            LoginResponse loginResponse = new LoginResponse(
                token,
                admin.getUsername(),
                admin.getEmail(),
                admin.getFullName(),
                admin.getRole().name()
            );
            
            return ResponseEntity.ok(ApiResponse.success("Login successful", loginResponse));
            
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Invalid username or password"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Login failed: " + e.getMessage()));
        }
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            String token = adminService.generatePasswordResetToken(request.getEmail());
            return ResponseEntity.ok(ApiResponse.success("Password reset email sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to send password reset email: " + e.getMessage()));
        }
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        try {
            boolean success = adminService.resetPassword(request.getToken(), request.getNewPassword());
            if (success) {
                return ResponseEntity.ok(ApiResponse.success("Password reset successfully"));
            } else {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid or expired reset token"));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Password reset failed: " + e.getMessage()));
        }
    }
    
    @GetMapping("/validate-reset-token")
    public ResponseEntity<ApiResponse<Boolean>> validateResetToken(@RequestParam String token) {
        boolean isValid = adminService.isValidResetToken(token);
        return ResponseEntity.ok(ApiResponse.success("Token validation result", isValid));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        // Since we're using stateless JWT, logout is handled on the frontend
        // by removing the token from storage
        return ResponseEntity.ok(ApiResponse.success("Logout successful"));
    }
}