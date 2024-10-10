import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cv } from '../interfaces/cv';
import { CvService } from '../api-services/cv.services';
import { Users } from '../interfaces/users';
import { ProjectDetails } from '../interfaces/project_details';
import { UserService } from '../api-services/user.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ProjectDetailsService } from '../api-services/project-details.service';
import { CvWithProjectDetails } from '../interfaces/cvwithprojectdetails';

@Component({
  selector: 'app-user-cv-search',
  templateUrl: './testsearch.component.html',
  styleUrls: ['./testsearch.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf]
})
export class TestSearchComponent implements OnInit {
  searchForm!: FormGroup;
  usersWithCvsAndProjectDetails: { user: Users, cvs: CvWithProjectDetails[] }[] = [];
  showUsers: boolean = false;

  constructor(private cvService: CvService, private userService: UserService, private formBuilder: FormBuilder, private pdService: ProjectDetailsService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['']
    });

    this.searchForm.get('searchQuery')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.showUsers = false; 
    });
  }

  onSubmit(): void {
    const query = this.searchForm?.get('searchQuery')?.value;
    this.searchUsers(query);
  }

  searchUsers(query: string): void {
    if (query.trim() !== '') {
      this.userService.searchUsers(query).subscribe(users => {
        this.usersWithCvsAndProjectDetails = users.slice(0, 3).map(user => ({ user, cvs: [] }));
        this.fetchCvsAndProjectDetailsForUsers();
        this.showUsers = true; 
      });
    } else {
      this.usersWithCvsAndProjectDetails = [];
      this.showUsers = false; 
    }
  }

  fetchCvsAndProjectDetailsForUsers(): void {
    this.usersWithCvsAndProjectDetails.forEach(userWithCvsAndProjectDetails => {
      this.cvService.getCvsByUserId(userWithCvsAndProjectDetails.user.user_id).subscribe(cvs => {
        cvs.forEach(cv => {
          this.pdService.getPdsByCvId(cv.cv_id).subscribe(projectDetails => {
            if (cv.user_id === userWithCvsAndProjectDetails.user.user_id) {
              const relevantProjectDetails = projectDetails.filter(pd => pd.cv_id === cv.cv_id);
              userWithCvsAndProjectDetails.cvs.push({ cv, projectDetails: relevantProjectDetails });
            }
          });
        });
      });
    });
  }


}

