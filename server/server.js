require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb');
const routes = require('./route/route');

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'API Server is running!',
    status: 'success',
    endpoints: {
      api: '/api',
      health: '/health'
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use('/api', routes);

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableRoutes: ['/', '/health', '/api/*']
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}`);
  console.log(`Root endpoint: http://localhost:${PORT}/`);
  console.log(`API endpoints: http://localhost:${PORT}/api`);
});