import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiResponse } from '../../models/api-response';
import { IUser } from '../../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _http = inject(HttpClient);
  private apiLink = 'http://localhost:3000/users';

  users = signal<{ isLoading: boolean; value: ApiResponse<IUser[]> | null; error: any }>({
    isLoading: true,
    value: null,
    error: null
  });

  constructor() {
    this.fetchUsers();
  }

  fetchUsers() {
    this._http.get<ApiResponse<IUser[]>>(this.apiLink).subscribe({
      next: (res) => {
        this.users.set({ isLoading: false, value: res, error: null });
      },
      error: (err) => {
        this.users.set({ isLoading: false, value: null, error: err });
      }
    });
  }
}
