import { Injectable, computed, signal } from '@angular/core';
import { UserSession } from '../models/user.model';

const STORAGE_KEY = 'stockroom-lite-session';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly currentSessionSignal = signal<UserSession | null>(this.loadSession());

  readonly session = computed(() => this.currentSessionSignal());
  readonly isAuthenticated = computed(() => Boolean(this.currentSessionSignal()?.accessToken));

  setSession(session: UserSession): void {
    this.currentSessionSignal.set(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  clearSession(): void {
    this.currentSessionSignal.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private loadSession(): UserSession | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserSession;
    } catch {
      return null;
    }
  }
}
