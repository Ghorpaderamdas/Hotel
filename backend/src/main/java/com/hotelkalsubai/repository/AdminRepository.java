package com.hotelkalsubai.repository;

import com.hotelkalsubai.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    Optional<Admin> findByUsername(String username);
    
    Optional<Admin> findByEmail(String email);
    
    Optional<Admin> findByResetToken(String resetToken);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    @Modifying
    @Query("UPDATE Admin a SET a.lastLogin = :lastLogin WHERE a.id = :id")
    void updateLastLogin(@Param("id") Long id, @Param("lastLogin") LocalDateTime lastLogin);
    
    @Modifying
    @Query("UPDATE Admin a SET a.resetToken = :token, a.resetTokenExpiry = :expiry WHERE a.email = :email")
    void updateResetToken(@Param("email") String email, @Param("token") String token, @Param("expiry") LocalDateTime expiry);
    
    @Modifying
    @Query("UPDATE Admin a SET a.password = :password, a.resetToken = null, a.resetTokenExpiry = null WHERE a.resetToken = :token")
    void resetPassword(@Param("token") String token, @Param("password") String password);
}