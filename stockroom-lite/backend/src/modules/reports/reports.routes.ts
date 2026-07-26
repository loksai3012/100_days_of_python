import { Router } from 'express';

const reportsRouter = Router();

reportsRouter.get('/sales', (_req, res) => {
  res.status(200).json({ success: true, message: 'Sales report endpoint scaffolded' });
});

export default reportsRouter;
