import { Router } from 'express';

const suppliersRouter = Router();

suppliersRouter.get('/', (_req, res) => {
  res.status(200).json({ success: true, message: 'Suppliers endpoint scaffolded' });
});

export default suppliersRouter;
