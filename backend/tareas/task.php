<?php
require_once '../models/DatabaseConnection.php';

header('Content-Type: application/json');

try {
    $db = DatabaseConnection::getInstance();
    
    // GET - Read Tasks in DB
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $db->query("SELECT * FROM tasks ORDER BY id");
        $tasks = $stmt->fetchAll();
        
        echo json_encode([
            'success' => true,
            'data' => $tasks,
            'count' => count($tasks)
        ]);
    }
    
    // POST - Create new task
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $db->prepare("INSERT INTO tasks (titulo, numero, descripcion, estado) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['titulo'], $data['numero'], $data['descripcion'], $data['estado']?? 'pendiente']);
        
        echo json_encode([
            'success' => true,
            'message' => 'tarea creada exitosamente',
            'id' => $db->lastInsertId()
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}