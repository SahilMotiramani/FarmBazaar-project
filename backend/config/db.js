require('dotenv').config();

module.exports = {
  DATABASE: process.env.DATABASE || 'mongodb://localhost:27017/farmbazaar1',
  JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '90d',
  JWT_COOKIE_EXPIRES_IN: parseInt(process.env.JWT_COOKIE_EXPIRES_IN) || 90,
  PORT: parseInt(process.env.PORT) || 3000
};