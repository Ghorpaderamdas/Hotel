-- Database schema for Hotel Kalsubai Admin System
-- PostgreSQL Database: hotel_kalsubai_admin

-- Create database (run this separately)
-- CREATE DATABASE hotel_kalsubai_admin;

-- Connect to the database and run the following:

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ADMIN',
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    last_login TIMESTAMP,
    reset_token VARCHAR(255),
    reset_token_expiry TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_reset_token ON admins(reset_token);

-- Insert default admin user (password: admin123)
-- Note: The password will be hashed by BCrypt in the application
INSERT INTO admins (username, email, password, full_name, role, is_enabled, created_at) 
VALUES (
    'admin',
    'admin@hotelkalsubai.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- BCrypt hash for 'admin123'
    'Hotel Kalsubai Administrator',
    'ADMIN',
    true,
    CURRENT_TIMESTAMP
) ON CONFLICT (username) DO NOTHING;

-- Insert additional admin user for testing
INSERT INTO admins (username, email, password, full_name, role, is_enabled, created_at) 
VALUES (
    'superadmin',
    'superadmin@hotelkalsubai.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- BCrypt hash for 'admin123'
    'Super Administrator',
    'ADMIN',
    true,
    CURRENT_TIMESTAMP
) ON CONFLICT (username) DO NOTHING;

-- Verify the data
SELECT id, username, email, full_name, role, is_enabled, created_at FROM admins;