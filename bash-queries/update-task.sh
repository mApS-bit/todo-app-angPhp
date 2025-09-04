#!/bin/bash

# Configuración
API_URL="http://localhost:8000/tareas/task.php"

echo "Script para actualizar tareas"
echo "API: $API_URL"
echo ""

# Función para mostrar ayuda
show_help() {
    echo "Uso: $0 [opciones]"
    echo "Opciones:"
    echo "  -i, --id ID          ID de la tarea a actualizar (requerido)"
    echo "  -t, --titulo TITULO  Nuevo título"
    echo "  -n, --numero NUMERO  Nuevo número"
    echo "  -d, --desc DESCRIPC  Nueva descripción"
    echo "  -e, --estado ESTADO  Nuevo estado (pendiente|en progreso|completado)"
    echo "  -h, --help           Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0 -i 1 -t \"Nuevo título\" -e completado"
    echo "  $0 --id 2 --numero 999 --desc \"Nueva descripción\""
}

# Parsear argumentos
while [[ $# -gt 0 ]]; do
    case $1 in
        -i|--id)
            TASK_ID="$2"
            shift
            shift
            ;;
        -t|--titulo)
            TITULO="$2"
            shift
            shift
            ;;
        -n|--numero)
            NUMERO="$2"
            shift
            shift
            ;;
        -d|--desc)
            DESCRIPCION="$2"
            shift
            shift
            ;;
        -e|--estado)
            ESTADO="$2"
            shift
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

# Validar que se proporcionó ID
if [ -z "$TASK_ID" ]; then
    echo "Error: Se requiere el ID de la tarea"
    show_help
    exit 1
fi

# Construir JSON dinámicamente
JSON_DATA="{"
if [ -n "$TITULO" ]; then
    JSON_DATA="$JSON_DATA \"titulo\": \"$TITULO\","
fi
if [ -n "$NUMERO" ]; then
    JSON_DATA="$JSON_DATA \"numero\": \"$NUMERO\","
fi
if [ -n "$DESCRIPCION" ]; then
    JSON_DATA="$JSON_DATA \"descripcion\": \"$DESCRIPCION\","
fi
if [ -n "$ESTADO" ]; then
    JSON_DATA="$JSON_DATA \"estado\": \"$ESTADO\","
fi

# Remover la última coma y cerrar JSON
JSON_DATA="${JSON_DATA%,}}"

# Si no hay campos para actualizar
if [ "$JSON_DATA" == "}" ]; then
    echo "Error: No se especificaron campos para actualizar"
    show_help
    exit 1
fi

echo "Actualizando tarea ID: $TASK_ID"
echo "Datos: $JSON_DATA"
echo ""

# Hacer la request
response=$(curl -s -X PUT "${API_URL}?id=${TASK_ID}" \
    -H "Content-Type: application/json" \
    -d "$JSON_DATA" \
    -w "HTTP_STATUS: %{http_code} | TIME: %{time_total}s")

echo "Respuesta: $response"