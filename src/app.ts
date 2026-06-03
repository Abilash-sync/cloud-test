import express from 'express';
import authRoutes from './routes/auth';

export function createApp() {
  const app = express();

  // Middleware
  app.use(express.json());

  // Routes
  app.use('/auth', authRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });

  return app;
}

export default createApp;
