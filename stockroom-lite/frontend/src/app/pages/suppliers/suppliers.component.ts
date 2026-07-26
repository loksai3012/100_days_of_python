import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Supplier } from '../../models/types';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: [''],
    phone: [''],
    address: ['']
  });

  constructor(private readonly api: ApiService, private readonly fb: FormBuilder) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.api.get<Supplier[]>('/suppliers').subscribe((res) => this.suppliers = res.data);
  }

  add(): void {
    if (this.form.invalid) return;
    this.api.post('/suppliers', this.form.getRawValue()).subscribe(() => {
      this.form.reset({ name: '', email: '', phone: '', address: '' });
      this.load();
    });
  }

  deleteItem(id: number): void {
    this.api.delete(`/suppliers/${id}`).subscribe(() => this.load());
  }
}
