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
import { TranslationsService } from '../api-services/translation.service';

@Component({
  selector: 'app-user-cv-search',
  templateUrl: './user-cv-search.component.html',
  styleUrls: ['./user-cv-search.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf]
})
export class UserCvSearchComponent implements OnInit {
  searchForm!: FormGroup;
  usersWithCvs: { user: Users, cvs: Cv[] }[] = [];
  showUsers: boolean = false;

  constructor(private cvService: CvService, private userService: UserService, private formBuilder: FormBuilder, private pdService: ProjectDetailsService, private tsService: TranslationsService) { }

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
        this.usersWithCvs = users.slice(0, 3).map(user => ({ user, cvs: [] }));
        this.fetchCvsForUsers();
        this.showUsers = true; 
      });
    } else {
      this.usersWithCvs = [];
      this.showUsers = false; 
    }
  }

  //Henter alle users med alle cvs. Hvis du har 4 cvs så smider den alle 4 værdier fra cv ud til alle bruger, uanset om de har et cv eller ej.
  // fetchCvsForUsers(): void {
  //   this.usersWithCvs.forEach(userWithCvs => {
  //     this.cvService.getCvsByUserId(userWithCvs.user.user_id).subscribe(cvs => {
  //       userWithCvs.cvs = cvs;
  //     });
  //   });
  // }


  //Henter cv for én enkelt user. Giver specifik info omkring cv til den pågældende user
  fetchCvsForUsers(): void {
    this.usersWithCvs.forEach(userWithCvs => {
      this.cvService.getCvsByUserId(userWithCvs.user.user_id).subscribe(cvs => {
        userWithCvs.cvs = cvs.filter(cv => cv.user_id === userWithCvs.user.user_id);
      });
    });
  }

  // fetchCvsForPd(): void {
  //   this.usersWithCvs.forEach(userWithCvs => {
  //     this.pdService.getProjectDetailsById(userWithCvs).subscribe(pds => {
  //       userWithCvs.pds = pds.filter(pd => cv.user_id === userWithCvs.user.user_id);
  //     });
  //   });
  // }

}
