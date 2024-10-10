import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-button',
  template: '<button (click)="redirectToHomePage()"><i class="fa fa-home"></i></button>',
  styleUrls: ['./home-button.component.css'],
})
export class HomeButtonComponent {

  constructor(private router: Router) { }

  redirectToHomePage() {
    this.router.navigate(['/']);
  }
}
