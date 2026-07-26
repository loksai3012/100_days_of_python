import { Router } from 'express';

const notificationsRouter = Router();

notificationsRouter.get('/', (_req, res) => {
  res.status(200).json({ success: true, message: 'Notifications endpoint scaffolded' });
});

export default notificationsRouter;
