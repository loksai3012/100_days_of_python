import { Router } from 'express';
import authRouter from '../modules/auth/auth.routes';
import usersRouter from '../modules/users/users.routes';
import categoriesRouter from '../modules/categories/categories.routes';
import suppliersRouter from '../modules/suppliers/suppliers.routes';
import productsRouter from '../modules/products/products.routes';
import purchasesRouter from '../modules/purchases/purchases.routes';
import salesRouter from '../modules/sales/sales.routes';
import inventoryRouter from '../modules/inventory/inventory.routes';
import dashboardRouter from '../modules/dashboard/dashboard.routes';
import notificationsRouter from '../modules/notifications/notifications.routes';
import reportsRouter from '../modules/reports/reports.routes';
import auditRouter from '../modules/audit/audit.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/suppliers', suppliersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/purchases', purchasesRouter);
apiRouter.use('/sales', salesRouter);
apiRouter.use('/inventory', inventoryRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/notifications', notificationsRouter);
apiRouter.use('/reports', reportsRouter);
apiRouter.use('/audit', auditRouter);

export default apiRouter;
