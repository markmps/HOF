import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Translations } from '../interfaces/translations';
@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  private apiUrl = 'http://localhost:5030/api/translation';

  constructor(private http: HttpClient) { }

  getTranslations(): Observable<Translations[]> {
    return this.http.get<Translations[]>(this.apiUrl);
  }

  getTranslationsByCvId(translations_id: number, cv_id: number): Observable<Translations> {
    return this.http.get<Translations>(`${this.apiUrl}/${translations_id}/${cv_id}`);
  }

  createTranslations(translate: Translations): Observable<Translations> {
    return this.http.post<Translations>(this.apiUrl, translate);
  }
}
