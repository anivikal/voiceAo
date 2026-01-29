import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import callController from './api/call.controller.js';
import handoffController from './api/handoff.controller.js';
import analyticsController from './api/analytics.controller.js';
import { CallNotFoundError, InvalidTransitionError } from './models/call.model.js';
import { TurnValidationError } from './models/turn.model.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'orchestrator-api' });
});

// Routes
app.use('/calls', callController);
app.use('/calls', handoffController);
app.use('/analytics', analyticsController);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  if (err instanceof CallNotFoundError) {
    res.status(404).json({ error: err.message });
    return;
  }

  if (err instanceof InvalidTransitionError) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof TurnValidationError) {
    res.status(400).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🧠 Orchestrator API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
});

export default app;
