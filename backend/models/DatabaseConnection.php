<?php
require_once '../config/database.php';

class DatabaseConnection {
    private static $instance = null;
    
    public static function getInstance() {
        if (self::$instance === null) {
            try {
                $dsn = "pgsql:host=" . DatabaseConfig::HOST . 
                       ";port=" . DatabaseConfig::PORT . 
                       ";dbname=" . DatabaseConfig::DBNAME;
                
                self::$instance = new PDO($dsn, DatabaseConfig::USER, DatabaseConfig::PASSWORD);
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                
            } catch (PDOException $e) {
                error_log("Database error: " . $e->getMessage());
                throw new Exception("Database connection failed");
            }
        }
        return self::$instance;
    }
}