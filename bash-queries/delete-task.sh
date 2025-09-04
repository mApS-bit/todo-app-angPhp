#!/bin/bash

# Configuración
API_URL="http://localhost:8000/tareas/task.php"

echo "Script para eliminar tareas"
echo "API: $API_URL"
echo ""

# Función para mostrar ayuda
show_help() {
    echo "Uso: $0 [opciones]"
    echo "Opciones:"
    echo "  -i, --id ID          ID de la tarea a eliminar (puede ser múltiple)"
    echo "  -a, --all            Eliminar TODAS las tareas (peligroso!)"
    echo "  -h, --help           Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0 -i 1"
    echo "  $0 -i 1 -i 2 -i 3"
    echo "  $0 --all"
}

# Parsear argumentos
TASK_IDS=()
while [[ $# -gt 0 ]]; do
    case $1 in
        -i|--id)
            TASK_IDS+=("$2")
            shift
            shift
            ;;
        -a|--all)
            DELETE_ALL=true
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Opción desconocida: $1"
            show_help
            exit 1
            ;;
    esac
done

# Eliminar todas las tareas
if [ "$DELETE_ALL" = true ]; then
    echo "⚠️  ADVERTENCIA: Esto eliminará TODAS las tareas"
    read -p "¿Estás seguro? (y/N): " confirm
    
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
        echo "Operación cancelada"
        exit 0
    fi

    # Obtener todos los IDs primero
    echo "Obteniendo todas las tareas..."
    response=$(curl -s -X GET "$API_URL")
    ids=$(echo "$response" | grep -o '"id":[0-9]*' | cut -d: -f2)
    
    if [ -z "$ids" ]; then
        echo "No hay tareas para eliminar"
        exit 0
    fi

    echo "Eliminando todas las tareas..."
    for id in $ids; do
        echo -n "Eliminando tarea $id: "
        curl -s -X DELETE "${API_URL}?id=${id}" \
            -H "Content-Type: application/json" \
            -w "HTTP_STATUS: %{http_code}\n"
    done
    exit 0
fi

# Eliminar tareas específicas
if [ ${#TASK_IDS[@]} -eq 0 ]; then
    echo "Error: Se requiere al menos un ID de tarea"
    show_help
    exit 1
fi

echo "Eliminando tareas: ${TASK_IDS[*]}"
echo ""

for id in "${TASK_IDS[@]}"; do
    echo -n "Eliminando tarea $id: "
    response=$(curl -s -X DELETE "${API_URL}?id=${id}" \
        -H "Content-Type: application/json" \
        -w "HTTP_STATUS: %{http_code} | TIME: %{time_total}s")
    echo "$response"
done