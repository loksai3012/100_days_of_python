import { Router } from 'express';

const purchasesRouter = Router();

purchasesRouter.get('/', (_req, res) => {
  res.status(200).json({ success: true, message: 'Purchases endpoint scaffolded' });
});

export default purchasesRouter;
