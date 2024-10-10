import { Component } from '@angular/core';
import { UserService } from '../api-services/user.service';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor( private userService: UserService) { }

  onSubmit() {
    this.userService.login(this.email, this.password).subscribe(
      (data) => {
        console.log(data);
        console.log('Success!');
      },
      (error) => {
        console.error(error);
        console.log('Failed!');
      }
    )
   
}

}
