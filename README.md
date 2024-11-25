
# Backend Test API

## Descripción

Esta API permite la gestión de usuarios, camiones (trucks), órdenes y ubicaciones (locations). Incluye autenticación con JWT y operaciones CRUD completas para cada dominio.

---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <repo-url>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura el archivo `.env` con las siguientes variables:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/testdb
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

4. Inicia el servidor:
   ```bash
   npm start
   ```

---

## Endpoints

### 1. Users

#### Registrar usuario
- **Endpoint:** `POST /users/register`
- **Body (JSON):**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Respuesta esperada:**
  ```json
  {
    "message": "Usuario registrado exitosamente",
    "userId": "64c9992f6ab6c7e0a5b7f4d4"
  }
  ```

#### Login
- **Endpoint:** `POST /users/login`
- **Body (JSON):**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Respuesta esperada:**
  ```json
  {
    "token": "JWT_TOKEN",
    "userId": "64c9992f6ab6c7e0a5b7f4d4"
  }
  ```

### 2. Trucks

#### Crear un truck
- **Endpoint:** `POST /trucks`
- **Headers:**
  ```makefile
  Authorization: Bearer JWT_TOKEN
  ```
- **Body (JSON):**
  ```json
  {
    "user": "64c9992f6ab6c7e0a5b7f4d4",
    "year": "2022",
    "color": "Red",
    "plates": "ABC123"
  }
  ```
- **Respuesta esperada:**
  ```json
  {
    "_id": "truck_id",
    "user": "64c9992f6ab6c7e0a5b7f4d4",
    "year": "2022",
    "color": "Red",
    "plates": "ABC123"
  }
  ```

#### Listar trucks
- **Endpoint:** `GET /trucks`
- **Headers:**
  ```makefile
  Authorization: Bearer JWT_TOKEN
  ```
- **Respuesta esperada:**
  ```json
  [
    {
      "_id": "truck_id",
      "user": "64c9992f6ab6c7e0a5b7f4d4",
      "year": "2022",
      "color": "Red",
      "plates": "ABC123"
    }
  ]
  ```

#### Actualizar un truck
- **Endpoint:** `PUT /trucks/:id`
- **Headers:**
  ```makefile
  Authorization: Bearer JWT_TOKEN
  ```
- **Body (JSON):**
  ```json
  {
    "color": "Blue"
  }
  ```
- **Respuesta esperada:**
  ```json
  {
    "_id": "truck_id",
    "user": "64c9992f6ab6c7e0a5b7f4d4",
    "year": "2022",
    "color": "Blue",
    "plates": "ABC123"
  }
  ```

#### Eliminar un truck
- **Endpoint:** `DELETE /trucks/:id`
- **Headers:**
  ```makefile
  Authorization: Bearer JWT_TOKEN
  ```
- **Respuesta esperada:**
  ```json
  {
    "message": "Truck eliminado"
  }
  ```

### 3. Orders

#### Crear una orden
- **Endpoint:** `POST /orders`
- **Headers:**
  ```makefile
  Authorization: Bearer JWT_TOKEN
  ```
- **Body (JSON):**
  ```json
  {
    "user": "64c9992f6ab6c7e0a5b7f4d4",
    "truck": "truck_id",
    "status": "created",
    "pickup": "location_id",
    "dropoff": "location_id"
  }
  ```
- **Respuesta esperada:**
  ```json
  {
    "_id": "order_id",
    "user": "64c9992f6ab6c7e0a5b7f4d4",
    "truck": "truck_id",
    "status": "created",
    "pickup": "location_id",
    "dropoff": "location_id"
  }
  ```

#### Listar órdenes
- **Endpoint:** `GET /orders`
- **Headers:**
  ```makefile
  Authorization: Bearer JWT_TOKEN
  ```
- **Respuesta esperada:**
  ```json
  [
    {
      "_id": "order_id",
      "user": "64c9992f6ab6c7e0a5b7f4d4",
      "truck": "truck_id",
      "status": "created",
      "pickup": "location_id",
      "dropoff": "location_id"
    }
  ]
  ```

#### Cambiar el estatus de una orden
- **Endpoint:** `PATCH /orders/:id/status`
- **Headers:**
  ```makefile
  Authorization: Bearer JWT_TOKEN
  ```
- **Body (JSON):**
  ```json
  {
    "status": "completed"
  }
  ```
- **Respuesta esperada:**
  ```json
  {
    "_id": "order_id",
    "user": "64c9992f6ab6c7e0a5b7f4d4",
    "truck": "truck_id",
    "status": "completed",
    "pickup": "location_id",
    "dropoff": "location_id"
  }
  ```

#### Eliminar una orden
- **Endpoint:** `DELETE /orders/:id`
- **Headers:**
  ```makefile
  Authorization: Bearer JWT_TOKEN
  ```
- **Respuesta esperada:**
  ```json
  {
    "message": "Orden eliminada"
  }
  ```
