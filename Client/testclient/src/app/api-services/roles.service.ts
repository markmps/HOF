import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roles } from '../interfaces/roles';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://localhost:5030/api/roles';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.apiUrl);
  }

  getRolesById(user_id: number, role_id: number): Observable<Roles> {
    return this.http.get<Roles>(`${this.apiUrl}/${user_id}/${role_id}`);
  }

  createRoles(roles: Roles): Observable<Roles> {
    return this.http.post<Roles>(this.apiUrl, roles);
  }

  updateRoles(id: number, roles: Roles): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, roles);
  }

  deleteRoles(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
