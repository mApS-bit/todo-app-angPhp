#!/bin/bash

# Configuración
API_URL="http://localhost:8000/tareas/task.php"
NUM_REQUESTS=10
SLEEP_TIME=0.5

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando test de stress para la API de tareas${NC}"
echo -e "${YELLOW}API: $API_URL${NC}"
echo -e "${YELLOW}Numero de requests: $NUM_REQUESTS${NC}"
echo ""

# Función para hacer requests
make_request() {
    local method=$1
    local data=$2
    local url=$3
    
    response=$(curl -s -X $method "$url" \
        -H "Content-Type: application/json" \
        -d "$data" \
        -w " | HTTP_STATUS: %{http_code} | TIME: %{time_total}s")
    
    echo "$response"
}

# 1. GET - Obtener todas las tareas
echo -e "${GREEN}1. Obteniendo tareas existentes...${NC}"
make_request "GET" "" "$API_URL"
echo ""

# 2. POST - Crear múltiples tareas
echo -e "${GREEN}2. Creando $NUM_REQUESTS tareas...${NC}"
for i in $(seq 1 $NUM_REQUESTS); do
    task_data=$(cat <<EOF
{
    "titulo": "Tarea de prueba $i",
    "numero": "$((1000 + i))",
    "descripcion": "Esta es la tarea número $i creada automaticamente",
    "estado": "pendiente"
}
EOF
    )
    
    echo -n "Creando tarea $i: "
    make_request "POST" "$task_data" "$API_URL"
    sleep $SLEEP_TIME
done
echo ""

# 3. GET - Verificar tareas creadas
echo -e "${GREEN}3. Verificando tareas después de crear...${NC}"
make_request "GET" "" "$API_URL"
echo ""

# 4. PUT - Actualizar algunas tareas
echo -e "${GREEN}4. Actualizando tareas...${NC}"
for i in $(seq 1 3); do
    update_data=$(cat <<EOF
{
    "titulo": "Tarea ACTUALIZADA $i",
    "estado": "completado"
}
EOF
    )
    
    echo -n "Actualizando tarea $i: "
    make_request "PUT" "$update_data" "$API_URL?id=$i"
    sleep $SLEEP_TIME
done
echo ""

# 5. DELETE - Eliminar algunas tareas
echo -e "${GREEN}5. Eliminando tareas...${NC}"
for i in $(seq 1 3); do
    echo -n "Eliminando tarea $i: "
    make_request "DELETE" "" "$API_URL?id=$i"
    sleep $SLEEP_TIME
done
echo ""

# 6. GET Final
echo -e "${GREEN}6. Estado final de tareas...${NC}"
make_request "GET" "" "$API_URL"

echo -e "${GREEN}Test completado!${NC}"