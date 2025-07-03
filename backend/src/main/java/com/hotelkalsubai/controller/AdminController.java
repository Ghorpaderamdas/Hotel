package com.hotelkalsubai.controller;

import com.hotelkalsubai.dto.ApiResponse;
import com.hotelkalsubai.entity.Admin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard(Authentication authentication) {
        Admin admin = (Admin) authentication.getPrincipal();
        
        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("welcomeMessage", "Welcome to Admin Dashboard");
        dashboardData.put("adminName", admin.getFullName());
        dashboardData.put("lastLogin", admin.getLastLogin());
        dashboardData.put("totalBookings", 127);
        dashboardData.put("totalMenuItems", 45);
        dashboardData.put("totalGalleryImages", 89);
        dashboardData.put("totalBlogPosts", 12);
        
        return ResponseEntity.ok(ApiResponse.success("Dashboard data retrieved successfully", dashboardData));
    }
    
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getProfile(Authentication authentication) {
        Admin admin = (Admin) authentication.getPrincipal();
        
        Map<String, Object> profile = new HashMap<>();
        profile.put("id", admin.getId());
        profile.put("username", admin.getUsername());
        profile.put("email", admin.getEmail());
        profile.put("fullName", admin.getFullName());
        profile.put("role", admin.getRole().name());
        profile.put("createdAt", admin.getCreatedAt());
        profile.put("lastLogin", admin.getLastLogin());
        
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", profile));
    }
}