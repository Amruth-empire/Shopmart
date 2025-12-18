# Shop Mart - Full Stack E-commerce Application

A modern e-commerce platform built with React (Vite + TypeScript) frontend and Express.js backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Install all dependencies (frontend + backend):**
   ```powershell
   npm run install:all
   ```

2. **Or install separately:**
   ```powershell
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

### Running the Application

#### Development Mode (Both servers)
```powershell
npm run dev
```
This starts:
- Backend: http://localhost:3000
- Frontend: http://localhost:8080

#### Run Separately

**Backend Only:**
```powershell
npm run backend:dev
# or
cd backend
npm run dev
```

**Frontend Only:**
```powershell
npm run frontend:dev
# or
cd frontend
npm run dev
```

### Production Build

**Build Frontend:**
```powershell
npm run frontend:build
```

**Run Backend in Production:**
```powershell
cd backend
NODE_ENV=production npm start
```

## 📁 Project Structure

```
Shop Mart/
├── backend/          # Express.js API
│   ├── config/       # Database & configs
│   ├── controllers/  # Route controllers
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── app.js        # Entry point
│
├── frontend/         # React + Vite
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   └── lib/         # API & utilities
│   └── vite.config.ts
│
└── package.json      # Root scripts
```

## 🔧 Configuration

### Backend Environment (.env)
```env
JWT_KEY=your_jwt_secret
EXPRESS_SESSION_SECRET=your_session_secret
NODE_ENV=development
```

### Frontend Environment (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 🛠️ Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Shadcn/ui
- React Query

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Session Management

## 📝 API Endpoints

- `GET /shop` - Get all products
- `POST /users/register` - Register user
- `POST /users/login` - Login user
- `GET /users/cart` - Get cart
- `POST /users/cart/add` - Add to cart
- `GET /orders` - Get orders
- `POST /payment/create` - Create payment

## 🔒 Features

- User Authentication
- Product Management
- Shopping Cart
- Order Processing
- Payment Integration
- Admin Panel
- Responsive Design

## 📦 Database Configuration

**Development:** Local MongoDB (mongodb://127.0.0.1:27017)

**Production:** MongoDB Atlas (configured in config/production.json)

## 🤝 Contributing

1. Make changes
2. Test locally
3. Build frontend: `npm run frontend:build`
4. Deploy

## 📄 License

ISC
