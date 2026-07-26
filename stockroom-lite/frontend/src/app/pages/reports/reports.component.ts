import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { Product, StockTransaction } from '../../models/types';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './reports.component.html'
})
export class ReportsComponent {
  inventory: Product[] = [];
  sales: StockTransaction[] = [];

  constructor(private readonly api: ApiService) {}

  loadInventory(): void {
    this.api.get<Product[]>('/reports/inventory').subscribe((res) => this.inventory = res.data);
  }

  loadSales(): void {
    this.api.get<{ sales: StockTransaction[] }>('/reports/sales').subscribe((res) => this.sales = res.data.sales);
  }

  exportPdf(): void {
    window.open('http://localhost:5000/api/reports/inventory/pdf', '_blank');
  }
}
