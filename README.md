# ⚡ PokeAPI UTN - Clean Architecture REST API

Una API RESTful para la gestión de Entrenadores Pokémon, sus equipos y medallas. 

## 🛠️ Tecnologías Utilizadas

* **Runtime & Framework:** Node.js (v20+) y Express 5 (Manejo nativo de promesas)
* **Base de Datos:** MongoDB & Mongoose
* **Validación de Datos:** Zod
* **Documentación:** Swagger (OpenAPI 3.0 via `swagger-jsdoc` y `swagger-ui-express`)
* **Contenedores:** Docker & Docker Compose
* **Integración Externa:** Axios (Consumo de PokeAPI v2 con sistema de caché local - Snapshot persistente)

## ✨ Características Principales

* **Arquitectura Limpia:** Separación estricta en capas desacopladas (`Routes` -> `Controllers` -> `Services` -> `Repositories` -> `Models`).
* **Filtros Avanzados:** Búsqueda combinada de Pokémones por múltiples estadísticas planas (`vidaMin`, `ataqueMax`, `tipo`, peso, altura, velocidad, etc.) y paginación.
* **Gestión de Equipos y Medallas:** Reglas de negocio estrictas (máximo 6 Pokémones por entrenador, prevención de duplicados y asociación de medallas de gimnasio).
* **Manejo Centralizado de Errores:** Middleware global adaptado a Express 5 y errores tipados de Zod.
* **Documentación Interactiva:** Interfaz Swagger UI generada automáticamente mediante anotaciones en el código.

## 📂 Estructura del Proyecto

```text
├── clients/          # Clientes HTTP para APIs externas (PokeAPI)
├── configs/          # Configuraciones (Conexión MongoDB, Seeders)
├── controllers/      # Controladores HTTP (Manejo de peticiones y respuestas)
├── docs/             # Configuración y esquemas de Swagger
├── errors/           # Clases personalizadas de Errores (AppError, NotFound...)
├── mappers/          # Transformadores de datos externos al modelo de dominio
├── middlewares/      # Interceptores de Express (ErrorHandler, Validaciones Zod)
├── models/           # Entidades Core del Dominio (Puro JavaScript, sin dependencias)
├── repositories/     # Capa de acceso a datos (Mongoose Models)
├── routes/           # Definición de rutas y anotaciones Swagger
├── schemas/          # Esquemas Mongoose y validaciones Zod
├── services/         # Casos de uso y reglas de negocio
└── snapshot/         # Gestor de caché persistente en disco (pokemon_snapshot.json)
```

---

## 🚀 Guía de Instalación y Ejecución Paso a Paso

Sigue estos pasos detallados para levantar todo el entorno de desarrollo localmente utilizando Docker.

1. **Clonar el repositorio:**
   Abre tu terminal y clona el proyecto en tu máquina local:
   ```bash
   git clone https://github.com/TU_USUARIO/expo_desarrollo_busquedas.git
   cd expo_desarrollo_busquedas
   ```
   *(Verificación: Asegúrate de estar ubicado dentro de la carpeta raíz del proyecto).*

2. **Configurar el archivo de entorno (.env):**
   Copia el archivo de plantilla `.env.example` y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Verificación: Confirma que el archivo `.env` se haya creado en la raíz).*

3. **Levantar los contenedores con Docker Compose:**
   Ejecuta el comando para construir las imágenes y encender MongoDB y Node en segundo plano:
   ```bash
   docker compose up --build -d
   ```
   *(Verificación: Ejecuta `docker compose ps` y asegúrate de que ambos contenedores estén en estado running).*

---

## ⚙️ Variables de Entorno (`.env`)

El proyecto utiliza variables de entorno para aislar la configuración. Guíate de esta estructura:

```env
# Puerto de ejecución de la API
PORT=3000

# URI de conexión a la base de datos
MONGODB_URI=mongodb://root:secret@localhost:27017

# Nombre de la base de datos
MONGO_DB_NAME=pokemones_api_ddso2c2026

# Intervalo de refresco del snapshot en milisegundos (43200000 = 12 horas)
REFRESH_INTERVAL=43200000
```

---

## 📖 Documentación de la API (Swagger)

Una vez que el servidor esté corriendo, puedes explorar todos los endpoints y probar las peticiones directamente desde la interfaz web interactiva en:

👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

## 🧪 Pruebas con Postman

Puedes importar la colección completa de endpoints guardando el archivo JSON de la colección e importándolo directamente en Postman para probar los endpoints del sistema, los filtros avanzados de Pokémones, el CRUD de Entrenadores y la asignación de equipos y medallas.