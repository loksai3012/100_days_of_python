import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category, Product, Supplier } from '../../models/types';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  imageFile?: File;
  search = '';

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    sku: ['', [Validators.required]],
    description: [''],
    unitPrice: [0, [Validators.required, Validators.min(0.01)]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    lowStockThreshold: [5, [Validators.required, Validators.min(1)]],
    categoryId: [0, [Validators.required, Validators.min(1)]],
    supplierId: [0, [Validators.required, Validators.min(1)]]
  });

  constructor(private readonly api: ApiService, private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadReferences();
    this.loadProducts();
  }

  loadReferences(): void {
    this.api.get<Category[]>('/categories').subscribe((res) => this.categories = res.data);
    this.api.get<Supplier[]>('/suppliers').subscribe((res) => this.suppliers = res.data);
  }

  loadProducts(): void {
    const params = this.search ? { q: this.search } : undefined;
    this.api.get<Product[]>('/products', params).subscribe((res) => this.products = res.data);
  }

  onImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imageFile = input.files?.[0];
  }

  add(): void {
    if (this.form.invalid) return;

    const fd = new FormData();
    const data = this.form.getRawValue();
    Object.entries(data).forEach(([k, v]) => fd.append(k, String(v)));
    if (this.imageFile) fd.append('image', this.imageFile);

    this.api.postForm('/products', fd).subscribe(() => {
      this.form.reset({ name: '', sku: '', description: '', unitPrice: 0, quantity: 0, lowStockThreshold: 5, categoryId: 0, supplierId: 0 });
      this.imageFile = undefined;
      this.loadProducts();
    });
  }

  deleteItem(id: number): void {
    this.api.delete(`/products/${id}`).subscribe(() => this.loadProducts());
  }
}
