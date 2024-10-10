import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../api-services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf]
})
export class UsersFormComponent implements OnInit {
  userForm!: FormGroup;
  successMessage: string ='';

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phonenumber: ['', Validators.required]
      

    });
  }


  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(
        response => {
          console.log('User created successfully:', response);
          this.userForm.reset();
          this.successMessage = 'User created successfully!'
        },
        error => {
          console.error('Error adding user:', error);
          this.successMessage = 'Something went wrong when trying to create user';
        }
      );

      console.log(this.userForm.value);
    }
  }
}
