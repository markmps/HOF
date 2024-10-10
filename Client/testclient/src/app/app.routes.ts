import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersFormComponent } from './users-form/users-form.component';
// import { SimpleFormComponent } from './simple-form/simple-form.component';
import { TestSearchComponent } from './testsearch/testsearch.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CvFormComponent } from './cv-form/cv-form.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { CoursesComponent } from './courses/courses.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { UserCvSearchComponent } from './user-cv-search/user-cv-search.component';
import { DeleteRolesComponent } from './delete-roles/delete-roles.component';
import { LoginComponent } from './login/login.component';
import { TranslationsComponent } from './translations/translations.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'cvform', component: CvFormComponent},
    {path: 'courses', component: CoursesComponent},
    {path: 'userform', component: UsersFormComponent},
    {path: 'projectdetails', component: ProjectDetailsComponent},
    {path: 'deleteroles', component: DeleteRolesComponent},
    {path: 'roles', component: UserRolesComponent},
    {path: 'users', component: UsersComponent },
    {path: 'usercvsearch', component: UserCvSearchComponent},
    {path: 'testsearch', component: TestSearchComponent},
    {path: 'login', component: LoginComponent},
    {path: 'translate', component: TranslationsComponent},
    // {path: 'simpleform', component: SimpleFormComponent},
    {path: '**', pathMatch:'full', component: PageNotFoundComponent}
];
