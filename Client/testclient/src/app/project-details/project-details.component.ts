import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectDetailsService } from '../api-services/project-details.service';
import { NgIf, NgFor } from '@angular/common';
import { CvService } from '../api-services/cv.services';
import { Cv } from '../interfaces/cv';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, MatTooltip],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})

export class ProjectDetailsComponent {
  pdForm!: FormGroup;
  successMessage: string ='';
  cvs!: Cv[];

  constructor(private formBuilder: FormBuilder, private pdService: ProjectDetailsService, private cvService: CvService) { }

  ngOnInit(): void {
    this.pdForm = this.formBuilder.group({
      cv_id: ['', Validators.required],
      whichfirm: ['', Validators.required],
      position: ['', Validators.required],
      period: ['', Validators.required],
      project: ['', Validators.required],
      tools: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.cvService.getCvs().subscribe(cvs => this.cvs = cvs);

  }


  onSubmit() {
    if (this.pdForm.valid) {
      this.pdService.createProjectDetails(this.pdForm.value).subscribe(
        response => {
          console.log('Project details created successfully:', response);
          this.pdForm.reset();
          this.successMessage = 'Project details created successfully!';
        },
        error => {
          console.error('Error adding user:', error);
          this.successMessage = 'Something went wrong when trying to create Project details';
        }
      );

      console.log(this.pdForm.value);
    }

  }

}



