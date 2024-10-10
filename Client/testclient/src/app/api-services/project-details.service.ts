import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectDetails } from '../interfaces/project_details';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailsService {
  private apiUrl = 'http://localhost:5030/api/projectdetails';

  constructor(private http: HttpClient) { }

  getProjectDetails(): Observable<ProjectDetails[]> {
    return this.http.get<ProjectDetails[]>(this.apiUrl);
  }

  getProjectDetailsById(id: number): Observable<ProjectDetails> {
    return this.http.get<ProjectDetails>(`${this.apiUrl}/${id}`);
  }

  createProjectDetails(projectdetails: ProjectDetails): Observable<ProjectDetails> {
    return this.http.post<ProjectDetails>(this.apiUrl, projectdetails);
  }

  updateProjectDetails(id: number, projectdetails: ProjectDetails): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, projectdetails);
  }

  getPdsByCvId(cvId: number): Observable<ProjectDetails[]> {
    return this.http.get<ProjectDetails[]>(`${this.apiUrl}?cv_id=${cvId}`);
  }

  deleteProjectDetails(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
