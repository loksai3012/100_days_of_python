import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, User } from '../models/types';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<User | null>(this.readStoredUser());

  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.api.post<AuthResponse>('/auth/login', { email, password }).pipe(
      map((res: ApiResponse<AuthResponse>) => res.data),
      tap(({ token, user }) => {
        localStorage.setItem('stockroom_token', token);
        localStorage.setItem('stockroom_user', JSON.stringify(user));
        this.currentUser.set(user);
      }),
      map(({ user }) => user)
    );
  }

  logout(): void {
    localStorage.removeItem('stockroom_token');
    localStorage.removeItem('stockroom_user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('stockroom_token'));
  }

  private readStoredUser(): User | null {
    const raw = localStorage.getItem('stockroom_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }
}
