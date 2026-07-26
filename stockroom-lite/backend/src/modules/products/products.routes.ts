import { Router } from 'express';
import { Role } from '@prisma/client';
import { auth } from '../../middleware/auth';
import { requireRoles } from '../../middleware/rbac';

const productsRouter = Router();

productsRouter.get('/', auth, (_req, res) => {
  res.status(200).json({ success: true, message: 'Products listing endpoint scaffolded' });
});

productsRouter.post('/', auth, requireRoles(Role.ADMIN, Role.MANAGER), (_req, res) => {
  res.status(201).json({ success: true, message: 'Create product endpoint scaffolded' });
});

export default productsRouter;
