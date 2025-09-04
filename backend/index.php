<?php
// --- CORS ---
header("Access-Control-Allow-Origin: *"); // mientras desarrollas, en prod mejor poner http://localhost:4200
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// manejar preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();

}

// aquí ya sigue tu enrutamiento normal
include './tareas/task.php'; 
