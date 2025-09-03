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

    //PUT -UPDATE Task
    elseif ($_SERVER['REQUEST_METHOD'] === 'PUT'){

        $data = json_decode(file_get_contents('php://input'), true);
        // Permitir id por query o body
        $id = $_GET['id'] ?? ($data['id'] ?? null);
        
        if (!$id) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => 'ID de usuario es requerido'
            ]);
            exit;
        }


        // Construir query 
        $campos = [];
        $valores = [];
        
        if (isset($data['titulo'])) {
            $campos[] = 'titulo = ?';
            $valores[] = $data['titulo'];
        }
        
        if (isset($data['numero'])) {
            $campos[] = 'numero = ?';
            $valores[] = $data['numero'];
        }
        
        if (isset($data['descripcion'])) {
            $campos[] = 'descripcion = ?';
            $valores[] = $data['descripcion'];
        }
        
        if (isset($data['estado'])){
            $campos[] = 'estado = ?';
            $valores[] = $data['estado'];
        }

        if (empty($campos)) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => 'No hay datos para actualizar'
            ]);
            exit;
        }
        
        $valores[] = $id; // Agregar ID al final para el WHERE
        
        $sql = "UPDATE tasks SET " . implode(', ', $campos) . " WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute($valores);
        
        echo json_encode([
            'success' => true,
            'message' => 'Tarea actualizada exitosamente',
            'rows_affected' => $stmt->rowCount()
        ]);
        exit;

    }

    //DELETE 
    elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE'){

        $data = json_decode(file_get_contents('php://input'), true);
        $id = $_GET['id'] ?? ($data['id'] ?? null);
        
        if (!$id) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => 'ID de la tarea es requerido'
            ]);
            exit;
        }

        $stmt = $db->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => true,
                'message' => 'Tarea eliminada exitosamente',
                'rows_affected' => $stmt->rowCount()
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Task Not Found'
            ]);
        }
        exit;

    }else{
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'error' => 'Método no permitido'
        ]);
        exit;
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}