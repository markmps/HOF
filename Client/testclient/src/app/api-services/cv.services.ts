import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cv } from '../interfaces/cv';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private apiUrl = 'http://localhost:5030/api/cv';

  constructor(private http: HttpClient) { }

  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(this.apiUrl);
  }

  getCvById(id: number): Observable<Cv> {
    return this.http.get<Cv>(`${this.apiUrl}/${id}`);
  }

  createCv(cv: Cv): Observable<Cv> {
    return this.http.post<Cv>(this.apiUrl, cv);
  }

  updateCv(id: number, cv: Cv): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cv);
  }

  deleteCv(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCvsByUserId(userId: number): Observable<Cv[]> {
    return this.http.get<Cv[]>(`${this.apiUrl}?user_id=${userId}`);
  }

  getCvsByUserIdTwo(userId: number): Observable<Cv[]> {
    return this.http.get<Cv[]>(`${this.apiUrl}/cvs/${userId}`);
  }
}
