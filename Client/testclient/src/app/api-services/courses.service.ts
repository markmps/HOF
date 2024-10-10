import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cv } from '../interfaces/cv';
import { Courses } from '../interfaces/courses';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = 'http://localhost:5030/api/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.apiUrl);
  }

  getCoursesById(id: number): Observable<Courses> {
    return this.http.get<Courses>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Courses): Observable<Courses> {
    return this.http.post<Courses>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Courses): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
