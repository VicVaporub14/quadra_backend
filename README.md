# Quadra Backend

Quadra Backend es una API REST desarrollada en Node.js y TypeScript para gestionar un sistema de alquiler de vehículos. Este proyecto utiliza Prisma como ORM para interactuar con una base de datos PostgreSQL y Mongoose para manejar ciertas colecciones en MongoDB. La API está diseñada para ser modular, escalable y fácil de mantener.

## Características principales

- **Gestión de vehículos**: CRUD completo para vehículos, incluyendo atributos como marca, modelo, color, año, tipo, precio por día, estado, y más.
- **Gestión de seguros**: CRUD para seguros asociados a los vehículos.
- **Reservas**: Gestión de reservas de vehículos, incluyendo fechas de inicio y fin, estado, y detalles del alquiler.
- **Autenticación**: Soporte para la creación de cuentas de usuario con contraseñas encriptadas.
- **Middleware**: Validación de entradas y verificación de existencia de recursos como vehículos y seguros.
- **Base de datos**: Uso de PostgreSQL para datos estructurados y MongoDB para datos no relacionales.
- **Configuración flexible**: Uso de variables de entorno para configurar la conexión a las bases de datos y otros parámetros.

## Tecnologías utilizadas

- **Node.js** y **Express**: Framework backend para construir la API REST.
- **TypeScript**: Tipado estático para mejorar la calidad del código.
- **Prisma**: ORM para interactuar con la base de datos PostgreSQL.
- **Mongoose**: ODM para manejar colecciones en MongoDB.
- **bcryptjs**: Para encriptar contraseñas.
- **express-validator**: Validación de entradas en las rutas.
- **dotenv**: Manejo de variables de entorno.

## Estructura del proyecto

El proyecto sigue una estructura modular para facilitar la escalabilidad y el mantenimiento:
