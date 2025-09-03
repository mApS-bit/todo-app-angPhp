<?php
// test_privileges.php
$host = 'localhost';
$dbname = 'todo_app';
$user = 'user_todo_app';
$password = 'bagre';

// Configurar para mostrar errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: text/plain');

try {
    echo "🔌 Intentando conectar a PostgreSQL...\n\n";
    
    // Conexión a la base de datos
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Conexión exitosa a PostgreSQL!\n\n";
    
    // 🔹 READ - Leer todos los usuarios
    echo "📖 Leyendo usuarios...\n";
    $stmt = $pdo->query("SELECT * FROM tasks ORDER BY id");
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Tareas encontrados: " . count($tasks) . "\n";
    foreach ($tasks as $tk) {
        echo "ID: {$tk['id']}, Nombre: {$tk['titulo']}, numero: {$tk['numero']}, descripcion: {$tk['descripcion']},
        estado: {$tk['estado']}, fecha: {$tk['fecha_creacion']}\n";
    }
    
    echo "\n🎉 ¡Conexión y lectura exitosas!\n";
    echo "El usuario 'marco' tiene los privilegios correctos\n";
    
} catch (PDOException $e) {
    echo "❌ Error de conexión: " . $e->getMessage() . "\n";
    echo "Código: " . $e->getCode() . "\n\n";
    
    // Mensajes específicos de ayuda
    if ($e->getCode() == '28P01') {
        echo "🔐 Error de autenticación. Verifica:\n";
        echo "   - La password del usuario 'marco'\n";
        echo "   - Que el usuario existe: sudo -u postgres psql -c '\du'\n";
    } elseif ($e->getCode() == '42501') {
        echo "🔒 Error de permisos. Ejecuta estos comandos como postgres:\n";
        echo "   GRANT ALL PRIVILEGES ON DATABASE test_data_base TO marco;\n";
        echo "   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO marco;\n";
    } elseif ($e->getCode() == '3D000') {
        echo "📋 La base de datos no existe. Creala con:\n";
        echo "   CREATE DATABASE test_data_base OWNER marco;\n";
    }
}
?>