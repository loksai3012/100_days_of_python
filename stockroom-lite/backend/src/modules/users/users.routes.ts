import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (_req, res) => {
  res.status(200).json({ success: true, message: 'Users endpoint scaffolded' });
});

export default usersRouter;
