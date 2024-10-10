import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgrammingLanguage } from '../interfaces/programming_language';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private apiUrl = 'http://localhost:5030/api/pl';

  constructor(private http: HttpClient) { }

  getPls(): Observable<ProgrammingLanguage[]> {
    return this.http.get<ProgrammingLanguage[]>(this.apiUrl);
  }

  getPlById(id: number): Observable<ProgrammingLanguage> {
    return this.http.get<ProgrammingLanguage>(`${this.apiUrl}/${id}`);
  }

  createPl(cv: ProgrammingLanguage): Observable<ProgrammingLanguage> {
    return this.http.post<ProgrammingLanguage>(this.apiUrl, cv);
  }

  updatePl(id: number, pl: ProgrammingLanguage): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pl);
  }

  deletePl(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
