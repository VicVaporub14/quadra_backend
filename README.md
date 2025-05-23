# Quadra Backend

Quadra Backend es una API REST desarrollada en Node.js y TypeScript para gestionar un sistema de alquiler de vehículos. Este proyecto utiliza Prisma como ORM para interactuar con una base de datos PostgreSQL y Mongoose para manejar ciertas colecciones en MongoDB. La API está diseñada para ser modular, escalable y fácil de mantener.

## Características principales

- **Gestión de vehículos**: CRUD completo para vehículos, incluyendo atributos como marca, modelo, color, año, tipo, precio por día, estado, y más.
- **Gestión de seguros**: CRUD para seguros asociados a los vehículos.
- **Reservas**: Gestión de reservas de vehículos, incluyendo fechas de inicio y fin, estado, y detalles del alquiler.
- **Autenticación**: 
  - Soporte para la creación de cuentas de usuario con contraseñas encriptadas.
  - Generación y validación de tokens JWT para la autenticación de usuarios.
  - Recuperación de contraseñas mediante correos electrónicos enviados con `nodemailer`.
- **Middleware**: Validación de entradas y verificación de existencia de recursos como vehículos y seguros.
- **Base de datos**: Uso de PostgreSQL para datos estructurados y MongoDB para datos no relacionales.
- **Configuración flexible**: Uso de variables de entorno para configurar la conexión a las bases de datos y otros parámetros.

## Tecnologías utilizadas

- **Node.js** y **Express**: Framework backend para construir la API REST.
- **TypeScript**: Tipado estático para mejorar la calidad del código.
- **Prisma**: ORM para interactuar con la base de datos PostgreSQL.
- **Mongoose**: ODM para manejar colecciones en MongoDB.
- **bcryptjs**: Para encriptar contraseñas.
- **jsonwebtoken (JWT)**: Para la generación y validación de tokens de autenticación.
- **nodemailer**: Para el envío de correos electrónicos, como recuperación de contraseñas.
- **express-validator**: Validación de entradas en las rutas.
- **dotenv**: Manejo de variables de entorno.

## Estructura del proyecto

El proyecto sigue una estructura modular para facilitar la escalabilidad y el mantenimiento:

```tree
src/
├── config/
├── controllers/
├── lib/
├── middleware/
├── models/
├── routes/
├── types/
└── utils/
```

## Instalación y configuración

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Configura las variables de entorno en un archivo `.env`:
   ```env
   DATABASE_POSTGRESQL=tu_url_de_postgresql
   DATABASE_MONGODB=tu_url_de_mongodb
   PORT=4000
   JWT_SECRET=tu_secreto_jwt
   EMAIL_HOST=smtp.tu_proveedor.com
   EMAIL_PORT=587
   EMAIL_USER=tu_correo
   EMAIL_PASS=tu_contraseña
   ```
4. Ejecuta las migraciones de Prisma:
   ```sh
   npx prisma migrate dev
   ```
5. Inicia el servidor en modo desarrollo:
   ```sh
   npm run dev
   ```

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para sugerir mejoras o reportar problemas.
