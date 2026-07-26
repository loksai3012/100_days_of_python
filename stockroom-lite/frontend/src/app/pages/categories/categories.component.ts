import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../../models/types';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  readonly form = this.fb.nonNullable.group({ name: ['', [Validators.required]], description: [''] });

  constructor(private readonly api: ApiService, private readonly fb: FormBuilder) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.api.get<Category[]>('/categories').subscribe((res) => this.categories = res.data);
  }

  add(): void {
    if (this.form.invalid) return;
    this.api.post('/categories', this.form.getRawValue()).subscribe(() => {
      this.form.reset({ name: '', description: '' });
      this.load();
    });
  }

  deleteItem(id: number): void {
    this.api.delete(`/categories/${id}`).subscribe(() => this.load());
  }
}
