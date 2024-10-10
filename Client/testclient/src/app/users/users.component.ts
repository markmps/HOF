import { Component, OnInit } from '@angular/core';
import { UserService } from '../api-services/user.service';
import { Users } from '../interfaces/users';
import { NgFor, NgIf } from '@angular/common'; 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [NgFor, NgIf]
})
export class UsersComponent  {
  users: Users[] = [];
  selectedUser: Users | undefined;
  error: any;
  
  constructor(private userService: UserService) { }

  //metode uden knap
  // ngOnInit(): void {
  //   this.getUsers();
  // }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(
        users => {
          this.users = users;
          this.error = null;
        },
        error => {
          this.error = error;
          console.error('Error fetching users:', error);
        }
      );
  }
  

  getUserById(id: number): void {
    this.userService.getUserById(id)
      .subscribe(user => {
        this.selectedUser = user;
      });
  }
  
  fetchAllUsers(): void {
    this.getUsers();
  }

}
