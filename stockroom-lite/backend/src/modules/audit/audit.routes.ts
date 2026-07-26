import { Router } from 'express';

const auditRouter = Router();

auditRouter.get('/logs', (_req, res) => {
  res.status(200).json({ success: true, message: 'Audit logs endpoint scaffolded' });
});

export default auditRouter;
