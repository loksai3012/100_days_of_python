import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { StockInComponent } from './pages/stock-in/stock-in.component';
import { StockOutComponent } from './pages/stock-out/stock-out.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', canActivate: [authGuard], component: DashboardComponent },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent },
  { path: 'categories', canActivate: [authGuard], component: CategoriesComponent },
  { path: 'suppliers', canActivate: [authGuard], component: SuppliersComponent },
  { path: 'stock-in', canActivate: [authGuard], component: StockInComponent },
  { path: 'stock-out', canActivate: [authGuard], component: StockOutComponent },
  { path: 'reports', canActivate: [authGuard], component: ReportsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'dashboard' }
];
