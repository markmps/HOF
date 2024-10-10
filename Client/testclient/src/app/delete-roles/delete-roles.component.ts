import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../api-services/user.service';
import { UserRoleService } from '../api-services/user-roles.service';
import { RoleService } from '../api-services/roles.service';
import { Users } from '../interfaces/users';
import { UserRoles } from '../interfaces/user-roles';
import { Roles } from '../interfaces/roles';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgFor]
})
export class DeleteRolesComponent implements OnInit {
  roleForm!: FormGroup;
  users!: Users[];
  userroles!: UserRoles[];
  roles!: Roles[];
  successMessage: string ='';

  constructor(private formBuilder: FormBuilder, private userService: UserService, private roleService: RoleService, private userRoleService: UserRoleService) { }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      role_id: ['', Validators.required]
    });

    this.userService.getUsers().subscribe(users => this.users = users);
    this.roleService.getRoles().subscribe(roles => this.roles = roles);

  }

  onDelete(user_id: number, role_id: number) {
    this.userRoleService.deleteUserRoles(user_id, role_id).subscribe(
      response => {
        console.log('User role deleted successfully:', response);
        this.successMessage = 'User role removed successfully!';
      },
      // error => {
      //   console.error('Error deleting user role:', error);
      //   this.successMessage = 'Something went wrong when trying to assign role';
      // }
    );
  }
}
