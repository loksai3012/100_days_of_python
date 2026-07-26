import { Router } from 'express';

const inventoryRouter = Router();

inventoryRouter.get('/summary', (_req, res) => {
  res.status(200).json({ success: true, message: 'Inventory summary endpoint scaffolded' });
});

export default inventoryRouter;
