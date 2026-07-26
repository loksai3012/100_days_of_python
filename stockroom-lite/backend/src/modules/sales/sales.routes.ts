import { Router } from 'express';

const salesRouter = Router();

salesRouter.get('/', (_req, res) => {
  res.status(200).json({ success: true, message: 'Sales endpoint scaffolded' });
});

export default salesRouter;
