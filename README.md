
# Backend Test API

---

## Cómo está hecho

Esta API está dividida en partes para que sea más fácil trabajar con ella:

- **Modelos:** Los esquemas (User, Truck, Order, Location) están definidos en la carpeta `models` usando Mongoose. Básicamente, ahí aseguramos que los datos sigan las reglas.
- **Rutas:** En la carpeta `routes` conectamos los endpoints con sus controladores. Es como el puente que organiza las operaciones CRUD y la autenticación.
- **Controladores:** En `controllers` está toda la lógica de las operaciones con la base de datos (crear, listar, actualizar, eliminar) y también el manejo del JWT.
- **Archivo principal (`app.ts`):** Aquí es donde Express se configura, conectamos MongoDB, y ponemos middlewares como body-parser y cors.
- **Variables de entorno:** Para que todo esté seguro y no haya claves sensibles en el código, usamos `.env` para guardar las credenciales de MongoDB y el secreto JWT.
- **Pruebas:** Probamos todo en Postman, enviando requests y asegurándonos de que los endpoints hagan lo que tienen que hacer.

---

## Instalación

1. Clona el repositorio (asume que ya sabes usar Git):
   ```bash
   git clone https://github.com/UrieLBadilloG/Backend_Checkpoint.git
   ```

2. Instala las dependencias, ya sabes el clásico:
   ```bash
   npm install
   ```

3. Configura el archivo `.env` con esto (súper básico):
   ```env
   MONGO_URI=mongodb://localhost:27017/testdb
   JWT_SECRET=JWT_TOKEN
   PORT=6000
   ```

4. Corre el servidor con este comando:
   ```bash
   npm run dev
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
