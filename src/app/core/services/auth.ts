import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import {
  AuthResponse,
  LoginData,
  SignupData
} from '../models/auth.model';

import { User } from '../models/user.model';

const API_URL = 'http://localhost:3000/auth';
const TOKEN_KEY = 'trend_store_token';
const USER_KEY = 'trend_store_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Store the currently logged-in user
  private currentUserSignal = signal<User | null>(
    this.loadStoredUser()
  );

  // Read-only access to current user
  readonly currentUser = computed(() => this.currentUserSignal());

  // Is there a logged-in user?
  readonly isLoggedIn = computed(
    () => this.currentUserSignal() !== null
  );

  // Is the current user an admin?
  readonly isAdmin = computed(
    () => this.currentUserSignal()?.role === 'admin'
  );


  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  // Signup

  signup(
    payload: SignupData
  ): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${API_URL}/signup`,
        payload
      )
      .pipe(

        tap((response) => {

          this.setSession(response);

        })

      );
  }


  // Login

  login(
    payload: LoginData
  ): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${API_URL}/login`,
        payload
      )
      .pipe(

        tap((response) => {

          this.setSession(response);

        })

      );
  }


  // Save token + user

  private setSession(
    response: AuthResponse
  ): void {

    localStorage.setItem(
      TOKEN_KEY,
      response.token
    );

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(response.data.user)
    );

    this.currentUserSignal.set(
      response.data.user
    );
  }


  // Get token

  getToken(): string | null {

    return localStorage.getItem(TOKEN_KEY);

  }


  // Logout

  logout(): void {

    localStorage.removeItem(TOKEN_KEY);

    localStorage.removeItem(USER_KEY);

    this.currentUserSignal.set(null);

    this.router.navigate(['/login']);

  }


  // Load user from localStorage


  private loadStoredUser(): User | null {

    const rawUser =
      localStorage.getItem(USER_KEY);

    if (!rawUser) {
      return null;
    }

    try {

      return JSON.parse(rawUser) as User;

    } catch {

      localStorage.removeItem(USER_KEY);

      localStorage.removeItem(TOKEN_KEY);

      return null;

    }

  }

}