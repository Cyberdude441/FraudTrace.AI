import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import caseRoutes from './routes/caseRoutes.js';
import evidenceRoutes from './routes/evidenceRoutes.js';
import entityRoutes from './routes/entityRoutes.js';
import graphRoutes from './routes/graphRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';
import inconsistencyRoutes from './routes/inconsistencyRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import auditRoutes from './routes/auditRoutes.js';
import mlRoutes from './routes/mlRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'FraudTrace AI Core Engine',
    version: '1.0.0-PROD',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/entities', entityRoutes);
app.use('/api/graph', graphRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/inconsistencies', inconsistencyRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/ml', mlRoutes);

// Central error handler
app.use(errorHandler);

// Connect DB & start server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  FraudTrace AI Server running on port ${PORT}`);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  System: Evidence Reconstruction & Incident Intelligence`);
    console.log(`====================================================`);
  });
}

startServer();
