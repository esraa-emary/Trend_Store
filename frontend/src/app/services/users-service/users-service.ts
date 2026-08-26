import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserResponse } from '../../models/iuser';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private _http = inject(HttpClient);

    apiLink = `http://localhost:3000/users`;
    id = signal("");

    users = httpResource<UserResponse>(() => `${this.apiLink}?limit=50`);
}