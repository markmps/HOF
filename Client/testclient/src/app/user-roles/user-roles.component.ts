import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../api-services/user.service';
import { UserRoleService } from '../api-services/user-roles.service';
import { RoleService } from '../api-services/roles.service';
import { Users } from '../interfaces/users';
import { UserRoles } from '../interfaces/user-roles';
import { Roles } from '../interfaces/roles';
import { NgFor } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgFor]
})
export class UserRolesComponent implements OnInit {
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

  onSubmit() {
    if (this.roleForm.valid) {
      this.userRoleService.createUserRoles(this.roleForm.value).subscribe(
        response => {
          console.log('Role assigned successfully:', response);
          this.roleForm.reset();
          this.successMessage = 'Role assigned successfully!';
        },
        error => {
          console.error('Error assigning role:', error);
          this.successMessage = 'Something went wrong when trying to assign role';
        }
      );
    }
  }
}
