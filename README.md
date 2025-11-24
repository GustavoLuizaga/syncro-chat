# syncro-chat

Aplicación web de mensajería en tiempo real que permite a los usuarios comunicarse instantáneamente.

## Manual Detallado

Para obtener información más detallada sobre el proyecto, consulta el [Manual Detallado](https://docs.google.com/document/d/1ovovKglFD5isFdk-nQJTDkoIHJBiRWfsfYRmvjRshhc/edit?usp=sharing).

## Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el proyecto localmente.

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Docker 
- PostgreSQL 

### 1. Clonar el Repositorio

```bash
git clone https://github.com/GustavoLuizaga/syncro-chat.git
cd syncro-chat
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
DB_USER=tu_usuario_db
DB_PASSWORD=tu_password_db
DB_NAME=syncro_chat
DATABASE_URL="postgresql://tu_usuario_db:tu_password_db@localhost:5432/syncro_chat?schema=public"

JWT_SECRET=tu_jwt_secret
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_email_password
```

### 3. Configurar la Base de Datos

#### Opción A: Usando Docker (Recomendado)

1. Asegúrate de que Docker esté ejecutándose.
2. Desde la carpeta `backend/`, ejecuta:

```bash
docker-compose up -d
```

Esto iniciará un contenedor PostgreSQL.

#### Opción B: PostgreSQL Local

Instala PostgreSQL localmente y crea una base de datos llamada `syncro_chat`.

### 4. Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### 5. Configurar Prisma

1. Genera el cliente de Prisma:

```bash
npx prisma generate
```

2. Ejecuta las migraciones:

```bash
npx prisma migrate dev
```

### 6. Instalar Dependencias del Frontend

```bash
cd ../frontend/syncro-chat-front
npm install
```

### 7. Ejecutar la Aplicación

#### Backend

Desde la carpeta `backend/`:

```bash
npm run dev
```

El backend estará disponible en `http://localhost:3000` (o el puerto configurado).

#### Frontend

Desde la carpeta `frontend/syncro-chat-front/`:

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173` (puerto por defecto de Vite).

### 8. Acceder a la Aplicación

Abre tu navegador y ve a `http://localhost:5173` para usar la aplicación.

## Scripts Disponibles

### Backend

- `npm run dev`: Ejecuta el servidor en modo desarrollo con nodemon.
- `npm run build`: Compila TypeScript y copia archivos estáticos.
- `npm start`: Ejecuta el servidor compilado.

### Frontend

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para verificar el código.
- `npm run preview`: Vista previa de la build de producción.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL, Socket.io
- **Frontend**: React, TypeScript, Vite, TailwindCSS, Socket.io-client
- **Autenticación**: JWT, Passport.js, Google OAuth
- **Base de Datos**: PostgreSQL

