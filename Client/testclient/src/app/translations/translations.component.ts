import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Translations } from '../interfaces/translations';
import { TranslationsService } from '../api-services/translation.service';
import { Cv } from '../interfaces/cv';
import { CvService } from '../api-services/cv.services';
import { response } from 'express';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf]
})
export class TranslationsComponent implements OnInit {
  tsForm!: FormGroup;
  cvs!: Cv[];
  successMessage: string ='';
  translations: Translations[] = [];
  error: any;

  constructor(private formBuilder: FormBuilder, private translationsService: TranslationsService, private cvService: CvService) { }

  ngOnInit(): void {
    this.tsForm = this.formBuilder.group({
      cv_id: ['', Validators.required],
      targetlanguage: ['', Validators.required]
    });

    this.cvService.getCvs().subscribe(cvs => this.cvs = cvs);

  }

  getTranslations(): void {
    this.translationsService.getTranslations()
      .subscribe(
        tranlation => {
          this.translations = tranlation;
          this.error = null;
        },
        error => {
          this.error = error;
          console.error('Error fetching translations:', error);
        }
      );
  }

  onSubmit() {
    if (this.tsForm.valid) {
      this.translationsService.createTranslations(this.tsForm.value).subscribe(
        response => {
          console.log('Translated successfully:', response);
          this.tsForm.reset();
          this.successMessage = 'Translated successfully!';
        },
        error => {
          console.error('Error trying to translate:', error);
          this.successMessage = 'Something went wrong when trying to translate';
        }
      );
    }
  }

  fetchAllTranslations(): void {
    this.getTranslations();
  }
}
