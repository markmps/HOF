import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CvService } from '../api-services/cv.services';
import { NgIf, NgFor } from '@angular/common';
import { Users } from '../interfaces/users';
import { UserService } from '../api-services/user.service';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, MatTooltipModule],
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.css'
})
export class CvFormComponent implements OnInit {
  cvForm!: FormGroup;
  successMessage: string = '';
  users!: Users[];

  constructor(private formBuilder: FormBuilder, private cvService: CvService, private userService: UserService) { }

  ngOnInit(): void {
    this.cvForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      nationality: ['', Validators.required],
      birthyear: ['', Validators.required],
      mainareas: ['', Validators.required],
      technicalexperience: ['', Validators.required],
      personalcharacteristics: ['', Validators.required],
      industryexperience: ['', Validators.required]
    });

    this.userService.getUsers().subscribe(users => this.users = users);
    
  }

  

  onSubmit() {
    if (this.cvForm.valid) {
      this.cvService.createCv(this.cvForm.value).subscribe(
        response => {
          console.log('Cv created successfully:', response);
          this.cvForm.reset();
          this.successMessage = 'Cv created successfully!';
        },
        error => {
          console.error('Error adding user:', error);
          this.successMessage = 'Something went wrong when trying to create Cv';
        }
      );

      console.log(this.cvForm.value);
    }

  }

}



