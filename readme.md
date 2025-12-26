# Backend API - Trabajo Práctico UTN

Proyecto backend desarrollado como **trabajo práctico** para la  
**Universidad Tecnológica Nacional (UTN)**, en el marco de la  
**Diplomatura Backend Developer – Turno Tarde**,  
dictada por el profesor **Gabriel Alberini**.

El objetivo del trabajo es aplicar los conceptos vistos en clase para construir una **API REST funcional**, utilizando **Node.js, Express y TypeScript**, siguiendo una arquitectura ordenada y buenas prácticas básicas de backend.

---

##  Autor

**Dante César Segovia**  
Alumno de la Diplomatura Backend Developer – Turno Tarde  
UTN – Universidad Tecnológica Nacional

---

##  Objetivo del proyecto

- Desarrollar una API REST en TypeScript
- Implementar arquitectura MVC
- Conectar el backend con una base de datos MongoDB
- Incorporar autenticación con JWT
- Validar datos de entrada
- Agregar seguridad básica (rate limit)
- Preparar el proyecto para producción y deploy

El backend está preparado para ser consumido por un frontend externo.

---

##  Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Zod (validaciones)
- Morgan (logs)
- Nodemailer (envío de correos)
- Express Rate Limit
- Dotenv

---

##  Estructura del proyecto


La estructura sigue el patrón **MVC**, separando responsabilidades para facilitar el mantenimiento y la lectura del código.

---

##  Autenticación

- Registro y login de usuarios
- Autenticación mediante **JWT**
- Middleware de autorización para proteger rutas
- Solo usuarios autenticados pueden:
  - Crear productos
  - Actualizar productos
  - Eliminar productos

---

## 🛡️ Seguridad

- **Rate limit** aplicado solo a las rutas de autenticación
- Uso de variables de entorno para datos sensibles
- Validación de inputs con Zod
- Manejo básico de errores

---

## 🔎 Filtros con Query Params

La API permite filtrar productos directamente desde la base de datos usando query params:

Ejemplos:
- Filtrar por categoría
- Filtrar por precio mínimo y máximo
- Buscar productos por nombre (búsqueda parcial)

---

## 📬 Envío de correos

Se implementó una funcionalidad básica de envío de correos utilizando **Nodemailer**, con plantillas HTML simples.

---

## ⚙️ Variables de entorno

El proyecto utiliza variables de entorno configuradas en un archivo `.env`.

Ejemplo de `.env.example`:

PORT=3000
URI_DB=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_email_password


---

## 🚀 Instalación y ejecución local

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install

- Crear archivo .env basado en .env.example

- Ejecutar en desarrollo:
npm run dev

## Scripts disponibles

npm run dev → Ejecuta el proyecto en desarrollo

npm run build → Compila TypeScript a JavaScript

npm start → Ejecuta el proyecto en producción

## Deploy
El backend está preparado para ser desplegado en Render.com, utilizando el código compilado en la carpeta dist.

## agradecimientos

Este proyecto fue desarrollado como parte del trabajo final de desarrollo backend aplicando los contenidos vistos en clase con el profesor Gabriel Alberini al cual agradezco su paciencia y calidez al enseña.
