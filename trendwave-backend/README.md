# TrendWave Backend API

A robust Node.js/Express backend API for the TrendWave application with TypeScript, MongoDB, and comprehensive authentication.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, rate limiting, input validation
- **TypeScript**: Full TypeScript support with strict type checking
- **Error Handling**: Centralized error handling middleware
- **Validation**: Request validation with express-validator
- **Development**: Hot reload with ts-node-dev

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/trendwave
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
```

### Running the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Health Check

- `GET /api/health` - API health status

## Project Structure

```
src/
├── config/          # Database and other configurations
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
└── server.ts        # Application entry point
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet

## Development

The API uses TypeScript for type safety and includes:

- Hot reload during development
- Comprehensive error handling
- Request validation
- MongoDB integration with Mongoose
- Role-based access control

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/trendwave |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRES_IN | JWT expiration time | 7d |
| BCRYPT_ROUNDS | Password hashing rounds | 12 |