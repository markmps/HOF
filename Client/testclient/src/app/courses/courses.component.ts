import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesService } from '../api-services/courses.service';
import { NgIf, NgFor } from '@angular/common';
import { UserService } from '../api-services/user.service';
import { CvService } from '../api-services/cv.services';
import { Users } from '../interfaces/users';
import { Cv } from '../interfaces/cv';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent {
  courseForm!: FormGroup;
  successMessage: string ='';
  cvs!: Cv[];
  users!: Users[];

  constructor(private formBuilder: FormBuilder, private coursesService: CoursesService, private userService: UserService, private cvService: CvService) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      cv_id: ['', Validators.required],
      year: ['', Validators.required],
      description: ['', Validators.required],
      user_id:['']

    });

    this.userService.getUsers().subscribe(users => this.users = users);
    this.cvService.getCvs().subscribe(cv => this.cvs = cv);

}

onSubmit() {
  if (this.courseForm.valid) {
    this.coursesService.createCourse(this.courseForm.value).subscribe(
      response => {
        console.log('Course created successfully:', response);
        this.courseForm.reset();
        this.successMessage = 'Course created successfully!'
      },
      error => {
        console.error('Error giving role:', error);
        this.successMessage = 'Something went wrong when trying to create a course';
        console.log(this.successMessage = 'Something went wrong when trying to create a course');
      }
    );
    console.log(this.users)
    console.log(this.courseForm.value);
    
  }
}

}




