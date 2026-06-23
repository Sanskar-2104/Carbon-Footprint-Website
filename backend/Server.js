import express from 'express';
import connectDB from './config/ConnectDB.js';
import authRoute from './routes/authRoute.js';
import footprintRoute from './routes/footprintRoute.js';
import gamificationRoute from './routes/gamificationRoute.js';
import billRoute from './routes/bill.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import carbonRoute from './routes/carbonRoute.js';
import { initializeDefaultAchievements } from './services/AchievementService.js';
dotenv.config();
const PORT = process.env.PORT || 5000;

// Initialize Express app
const app = express();

const start = async () => {
  try {
    await connectDB();

    // Middleware
    app.use(
      cors({
        origin: '*', // Allow all origins
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    );
    app.use(express.json());

    app.use('/api/auth', authRoute);
    app.use('/api/user', userRoute);
    app.use('/api/footprint', footprintRoute);
    app.use('/api/gamification', gamificationRoute);
    app.use('/api/bill', billRoute);
    app.use('/api/leaderboard', leaderboardRoutes);
    app.use('/api/achievement', achievementRoutes);
    app.use('/api/carbon', carbonRoute);

    // Initialize default achievements
    await initializeDefaultAchievements();

    // test route
    app.get('/', (req, res) => {
      res.json({ status: 'ok' });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`CORS allowed for all origins`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
