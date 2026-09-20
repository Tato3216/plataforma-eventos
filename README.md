# Plataforma de Eventos y Promociones

Aplicación web desarrollada para gestionar la confirmación de asistencia de clientes a un evento anual de promociones.

La plataforma permite registrar los datos del cliente, confirmar su asistencia, seleccionar servicios y productos de interés y calcular los descuentos correspondientes según las reglas establecidas.

## Tecnologías utilizadas

### Frontend
- React
- TypeScript
- Vite
- Nginx

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- Zod

### Base de datos
- PostgreSQL

### Infraestructura
- Docker
- Docker Compose

## Arquitectura

La aplicación utiliza una arquitectura cliente-servidor.

```text
┌─────────────────────┐
│      Navegador      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Frontend       │
│ React + TypeScript  │
│       Nginx         │
└──────────┬──────────┘
           │ REST / JSON
           ▼
┌─────────────────────┐
│       Backend       │
│ Node.js + Express   │
│    TypeScript       │
└──────────┬──────────┘
           │ Prisma
           ▼
┌─────────────────────┐
│     PostgreSQL      │
└─────────────────────┘
```

El backend se encuentra organizado en capas:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Prisma
  ↓
PostgreSQL
```

## Funcionalidades

- Registro de información del cliente.
- Confirmación de asistencia.
- Selección de fecha y hora de asistencia.
- Consulta del catálogo de servicios.
- Consulta del catálogo de productos.
- Selección de servicios y productos de interés.
- Cálculo de descuentos.
- Registro de la confirmación del cliente.
- Validación de datos de entrada.
- Aplicación dockerizada.

## Reglas de descuento

### Servicios

- Dos o más servicios seleccionados: 3%.
- Dos o más servicios y subtotal mayor a Q1,500: 5%.

### Productos

- Tres o cuatro productos seleccionados: 3%.
- Cinco o más productos seleccionados: 5%.

Los cálculos se realizan en el backend para evitar depender de valores enviados por el cliente.

## API

### Estado del servicio

```http
GET /api/health
```

### Servicios

```http
GET /api/services
```

### Productos

```http
GET /api/products
```

### Confirmación

```http
POST /api/confirmations
```

Ejemplo:

```json
{
  "customer": {
    "name": "Juan",
    "lastName": "Pérez",
    "email": "juan@example.com"
  },
  "attends": true,
  "attendanceAt": "2026-09-20T16:00:00.000Z",
  "serviceIds": [1, 2],
  "productIds": [1, 2, 3]
}
```

## Ejecución con Docker

### Requisitos

- Docker
- Docker Compose

Clonar el repositorio:

```bash
git clone https://github.com/Tato3216/plataforma-eventos.git
cd plataforma-eventos
```

Construir y levantar los servicios:

```bash
docker compose up --build -d
```

Aplicar las migraciones:

```bash
docker compose exec backend npx prisma migrate deploy
```

Ejecutar el seed desde el directorio `backend`:

```bash
cd backend
npm install
npm run db:seed
```

Volver a la raíz:

```bash
cd ..
```

La aplicación estará disponible localmente en:

```text
Frontend: http://localhost:8080
Backend:  http://localhost:3000
```

Para detener los contenedores:

```bash
docker compose down
```

## Estructura general

```text
plataforma-eventos/
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── repositories/
│   │   ├── routes/
│   │   └── services/
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## Decisiones técnicas

- PostgreSQL fue seleccionado como base de datos relacional.
- Prisma se utiliza para acceso a datos y migraciones.
- Zod se utiliza para validar las solicitudes recibidas por la API.
- El backend es responsable de consultar precios y calcular descuentos.
- El frontend únicamente envía los identificadores de los productos y servicios seleccionados.
- Las operaciones relacionadas con una confirmación se realizan mediante una transacción.
- Los servicios se ejecutan mediante contenedores Docker.