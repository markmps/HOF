import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRoles } from '../interfaces/user-roles';
@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private apiUrl = 'http://localhost:5030/api/userroles';

  constructor(private http: HttpClient) { }

  getUserRoles(): Observable<UserRoles[]> {
    return this.http.get<UserRoles[]>(this.apiUrl);
  }

  getUserRolesById(user_id: number, role_id: number): Observable<UserRoles> {
    return this.http.get<UserRoles>(`${this.apiUrl}/${user_id}/${role_id}`);
  }

  createUserRoles(roles: UserRoles): Observable<UserRoles> {
    return this.http.post<UserRoles>(this.apiUrl, roles);
  }

  updateUserRoles(id: number, roles: UserRoles): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, roles);
  }

  deleteUserRoles(user_id: number, role_id: number ): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${user_id}/${role_id}`);
  }
}
