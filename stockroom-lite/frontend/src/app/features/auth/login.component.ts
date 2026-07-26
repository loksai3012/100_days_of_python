import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../core/services/session.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly sessionService: SessionService,
  ) {}

  submit(): void {
    if (this.form.invalid) return;

    this.sessionService.setSession({
      id: 'demo-admin',
      name: 'Demo Admin',
      email: this.form.getRawValue().email,
      role: 'ADMIN',
      accessToken: 'demo-token',
    });

    void this.router.navigateByUrl('/dashboard');
  }
}
