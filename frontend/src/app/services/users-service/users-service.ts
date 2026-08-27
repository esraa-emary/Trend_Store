import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { IUser, UserResponse } from '../../models/iuser';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private _http = inject(HttpClient);

    apiLink = `http://localhost:3000/users`;
    id = signal("");

    users = httpResource<UserResponse>(() => `${this.apiLink}?limit=50`);

    getUserById(id: string): Observable<ApiResponse<IUser>> {
        return this._http.get<ApiResponse<IUser>>(`${this.apiLink}/${id}`);
    }
}