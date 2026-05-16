require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Direct import
const errorMiddleware = require('./middleware/error');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Team Task Manager API is running" });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use('/api', routes);
// Re-registering explicitly as requested by user to ensure dashboard is connected
app.use('/api/dashboard', dashboardRoutes);

// Error Handling
app.use(errorMiddleware);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
