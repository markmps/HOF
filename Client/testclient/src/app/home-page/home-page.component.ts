import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private router: Router) { }

  redirectToUserFormPage(){
    this.router.navigateByUrl('/userform');
  }

  redirectToUsersPage(){
    this.router.navigateByUrl('/users');
  }

  redirectToCvFormPage(){
    this.router.navigateByUrl('/cvform')
  }

  redirectToRoleFormPage(){
    this.router.navigateByUrl('/roles')
  }

  redirectToCoursesFormPage(){
    this.router.navigateByUrl('/courses')
  }

  redirectToProjetDetailsFormPage(){
    this.router.navigateByUrl('/projectdetails')
  }

  redirectToUserCvSearch(){
    this.router.navigateByUrl('/usercvsearch')
  }

  redirectToDeleteRoles(){
    this.router.navigateByUrl('/deleteroles')
  }

  redirectToTranslations(){
    this.router.navigateByUrl('/translate')
  }

}
