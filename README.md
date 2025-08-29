# Inventory Management (MongoDB + Spring Boot + React)

A minimal, production-ready starter for **inventory management** with:
- **Backend:** Spring Boot 3, MongoDB, JWT auth, Spring Security
- **Frontend:** React (Vite), HTML/CSS (no UI libs), axios
- **Features:** Register/Login, protected CRUD for items (name, sku, quantity, price, description).

## Quick Start

### Prereqs
- Java 17+
- Maven 3.9+
- Node 18+
- MongoDB running locally (`mongodb://localhost:27017`) or Atlas (provide `MONGODB_URI`)

### 1) Run Backend

```bash
cd backend
# Set secrets (use a Base64-encoded 256-bit key for HS256)
export JWT_SECRET=$(openssl rand -base64 32)
# Optional: export MONGODB_URI="your mongodb connection string"
mvn spring-boot:run
```

Server starts on `http://localhost:8080`

### 2) Run Frontend

```bash
cd frontend
npm install
cp .env.example .env   # edit if your API URL differs
npm run dev
```
App on `http://localhost:5173`

### API Summary

- `POST /api/auth/register` → `{ name, email, password }` → `{ token, name, email }`
- `POST /api/auth/login` → `{ email, password }` → `{ token, name, email }`
- `GET /api/items` (auth)
- `POST /api/items` (auth) → `{ name, sku, quantity, price?, description? }`
- `PUT /api/items/{id}` (auth)
- `DELETE /api/items/{id}` (auth)

Send `Authorization: Bearer <token>` for protected routes.

### Notes
- Default DB: `inventorydb` (change with `MONGODB_URI`).
- CORS allows `http://localhost:5173` by default; override via `ALLOWED_ORIGINS` env.
- Passwords are hashed with `BCryptPasswordEncoder`.
- JWT uses HS256 with your secret in `JWT_SECRET` (Base64 string).

### Folder Structure

```
inventory-mongo-react-springboot/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/example/inventory/...
├── frontend/
│   ├── package.json
│   └── src/...
└── README.md
```

### Troubleshooting
- **Mongo connection error**: ensure MongoDB is running, or set `MONGODB_URI` to Atlas URL.
- **401 Unauthorized**: make sure you include the `Authorization: Bearer <token>` header.
- **CORS issues**: set `ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173` and restart backend.
- **JWT secret**: must be Base64-encoded; use `openssl rand -base64 32`.
```

