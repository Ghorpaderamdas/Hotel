package com.hotelkalsubai.service;

import com.hotelkalsubai.entity.Admin;
import com.hotelkalsubai.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class AdminService implements UserDetailsService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private EmailService emailService;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return adminRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found with username: " + username));
    }
    
    public Optional<Admin> findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
    
    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
    
    public void updateLastLogin(Long adminId) {
        adminRepository.updateLastLogin(adminId, LocalDateTime.now());
    }
    
    public String generatePasswordResetToken(String email) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(email);
        if (adminOpt.isEmpty()) {
            throw new RuntimeException("Admin not found with email: " + email);
        }
        
        String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusHours(1); // 1 hour expiry
        
        adminRepository.updateResetToken(email, token, expiry);
        
        // Send email with reset link
        String resetLink = "http://localhost:3000/admin/reset-password?token=" + token;
        emailService.sendPasswordResetEmail(email, resetLink);
        
        return token;
    }
    
    public boolean resetPassword(String token, String newPassword) {
        Optional<Admin> adminOpt = adminRepository.findByResetToken(token);
        if (adminOpt.isEmpty()) {
            return false;
        }
        
        Admin admin = adminOpt.get();
        if (admin.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return false; // Token expired
        }
        
        String encodedPassword = passwordEncoder.encode(newPassword);
        adminRepository.resetPassword(token, encodedPassword);
        
        return true;
    }
    
    public boolean isValidResetToken(String token) {
        Optional<Admin> adminOpt = adminRepository.findByResetToken(token);
        if (adminOpt.isEmpty()) {
            return false;
        }
        
        Admin admin = adminOpt.get();
        return admin.getResetTokenExpiry().isAfter(LocalDateTime.now());
    }
    
    public Admin createAdmin(String username, String email, String password, String fullName) {
        if (adminRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        
        if (adminRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        
        Admin admin = new Admin(username, email, passwordEncoder.encode(password), fullName);
        return adminRepository.save(admin);
    }
}