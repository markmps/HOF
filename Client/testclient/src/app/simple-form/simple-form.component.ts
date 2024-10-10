// import { Component } from '@angular/core';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { Users } from '../interfaces/users';
// import { UserService } from '../api-services/user.service';

// @Component({
//   standalone: true,
//   selector: 'app-simple-form',
//   templateUrl: './simple-form.component.html',
//   styleUrls: ['./simple-form.component.css'],
//   imports: [ReactiveFormsModule, FormsModule]
// })
// export class SimpleFormComponent {
//   newUser: Users = {
//     fullname: '',
//     email: '',
//     password: '',
//     phonenumber: 0
//   };
//   error: any;

//   constructor(private userService: UserService) { }

//   onSubmit(): void {
//     this.userService.createUser(this.newUser)
//       .subscribe(
//         user => {
//           console.log('User created successfully:', user);
//           // Optionally, reset the form after successful submission
//           this.newUser = {
//             fullname: '',
//             email: '',
//             password: '',
//             phonenumber: 0,
//           };
//           this.error = null;
//         },
//         error => {
//           console.error('Error creating user:', error);
//           this.error = error;
//         }
//       );
//   }
// }