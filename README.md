# Task Manager – Laravel 12 & Next.js 15

A full-stack Task Manager application featuring:

- **User Authentication**: Register, Login, Logout
- **Task Management**: Create, Read, Update, Delete (CRUD)
- **Task Filtering**: Filter tasks based on status (e.g., All, Pending, Completed)

---

## Project Structure

```
├── server/   # Laravel 12 Backend
└── client/   # Next.js 15 Frontend
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [PHP ≥ 8.1](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org/download/)
- [Node.js ≥ 18](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [PostgreSQL](https://www.postgresql.org/download/)

---

### 1. Backend Setup – Laravel 12 (`server/`)

#### a. Navigate to the Backend Directory

```bash
cd server
```

#### b. Install Dependencies

```bash
composer install
```

#### c. Configure Environment Variables

```bash
cp .env.example .env
npm install && npm run build
```

Update the `.env` file with your PostgreSQL credentials:

```ini
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### d. Run Migrations

```bash
php artisan migrate
```

#### e. Serve the Application

```bash
composer run dev
```

The backend API will be accessible at `http://localhost:8000`.

---

### 2. Frontend Setup – Next.js 15 (`client/`)

#### a. Navigate to the Frontend Directory

```bash
cd ../client
```

#### b. Install Dependencies

```bash
npm install
```

#### c. Configure Environment Variables

Copy `.env.example` to new file `.env` file in the `client/` directory with the following content:


#### d. Run the Development Server

```bash
npm run dev
```

The frontend application will be accessible at `http://localhost:3000`.

---

## Authentication

The application uses Laravel Sanctum for authentication. Ensure that your frontend requests include credentials:

- **Backend**: You might need to set up CORS to allow requests from `http://localhost:3000`.

**CORS Configuration in `server/config/cors.php`:**

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

---

## Features

- **User Registration**: Create a new account.
- **User Login**: Authenticate with email and password.
- **User Logout**: Securely end the session.
- **Task Creation**: Add new tasks.
- **Task Listing**: View all tasks.
- **Task Filtering**: Filter tasks based on their status.
- **Task Editing**: Update task.
- **Task Deletion**: Delete tasks.

---

## Technologies Used

### Backend:

- Laravel 12
- Laravel Sanctum
- PostgreSQL

### Frontend:

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Axios
- React Query