import { Router } from 'express';

const dashboardRouter = Router();

dashboardRouter.get('/', (_req, res) => {
  res.status(200).json({ success: true, message: 'Dashboard endpoint scaffolded' });
});

export default dashboardRouter;
