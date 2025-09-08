-- Aromatic Impex System Database Schema
CREATE DATABASE IF NOT EXISTS u265780679_aromatic_impex;
USE u265780679_aromatic_impex;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS pay_adjustments;
DROP TABLE IF EXISTS time_entries;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS quote_requests;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('employee', 'admin', 'manager') DEFAULT 'employee',
    hourly_rate DECIMAL(10,2) DEFAULT 15.00,
    hire_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email)
);

CREATE TABLE time_entries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    clock_in_time DATETIME NOT NULL,
    clock_out_time DATETIME NULL,
    break_duration_minutes INT DEFAULT 0,
    notes TEXT,
    daily_rate DECIMAL(10,2) NULL,
    workload_level ENUM('light', 'normal', 'heavy', 'overtime') DEFAULT 'normal',
    workload_multiplier DECIMAL(3,2) DEFAULT 1.00,
    total_hours DECIMAL(5,2) NULL,
    total_pay DECIMAL(10,2) NULL,
    status ENUM('active', 'completed', 'pending_approval') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    INDEX idx_employee_id (employee_id),
    INDEX idx_clock_in_time (clock_in_time)
);

CREATE TABLE pay_adjustments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    adjustment_date DATE NOT NULL,
    adjustment_type ENUM('daily_rate', 'hourly_multiplier', 'bonus', 'deduction') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    reason VARCHAR(255),
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES employees(id)
);

CREATE TABLE user_sessions (
    id VARCHAR(255) PRIMARY KEY,
    employee_id INT NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    INDEX idx_employee_id (employee_id),
    INDEX idx_expires_at (expires_at)
);

CREATE TABLE quote_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    spice_types TEXT NOT NULL,
    quantity VARCHAR(255) NOT NULL,
    message TEXT,
    status ENUM('pending', 'reviewed', 'quoted', 'closed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status)
);

-- Insert default admin user (password: admin123)
INSERT INTO employees (username, password, first_name, last_name, email, role, hourly_rate, hire_date) 
VALUES (
    'admin', 
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeapcsNABOk7qRzGm',
    'System', 
    'Administrator', 
    'admin@aromaticimpex.com', 
    'admin', 
    25.00, 
    CURDATE()
);

-- Sample employees (password: admin123)
INSERT INTO employees (username, password, first_name, last_name, email, role, hourly_rate, hire_date) 
VALUES 
    ('john.doe', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeapcsNABOk7qRzGm', 'John', 'Doe', 'john.doe@aromaticimpex.com', 'employee', 18.00, CURDATE()),
    ('jane.smith', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeapcsNABOk7qRzGm', 'Jane', 'Smith', 'jane.smith@aromaticimpex.com', 'employee', 20.00, CURDATE()),
    ('mike.manager', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeapcsNABOk7qRzGm', 'Mike', 'Manager', 'mike.manager@aromaticimpex.com', 'manager', 22.00, CURDATE());

SELECT 'Database schema created successfully!' as message;
