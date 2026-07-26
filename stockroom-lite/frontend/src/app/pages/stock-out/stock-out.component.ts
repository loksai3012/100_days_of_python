import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-stock-out',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './stock-out.component.html'
})
export class StockOutComponent {
  readonly form = this.fb.nonNullable.group({
    productId: [0, [Validators.required, Validators.min(1)]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    unitPrice: [0, [Validators.min(0.01)]],
    note: ['']
  });

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService) {}

  submit(): void {
    if (this.form.invalid) return;
    this.api.post('/stock/out', this.form.getRawValue()).subscribe(() => {
      this.form.reset({ productId: 0, quantity: 1, unitPrice: 0, note: '' });
    });
  }
}
