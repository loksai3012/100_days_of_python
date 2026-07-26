import { Router } from 'express';

const categoriesRouter = Router();

categoriesRouter.get('/', (_req, res) => {
  res.status(200).json({ success: true, message: 'Categories endpoint scaffolded' });
});

export default categoriesRouter;
