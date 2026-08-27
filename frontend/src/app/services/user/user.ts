import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { IUser } from '../../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _http = inject(HttpClient);
  private apiLink = `http://localhost:3000/users`;

  getProfile(): Observable<ApiResponse<IUser>> {
    return this._http.get<ApiResponse<IUser>>(`${this.apiLink}/profile`);
  }
}
