import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { EmployeesComponent } from './employees/employees.component';
import { RolesComponent } from './roles/roles.component';
import { UserManagementComponent } from './user-management.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { RoleUpdateComponent } from './role-update/role-update.component';
import {MatButtonModule} from '@angular/material/button';
// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'customers',
        pathMatch: 'full'
      },
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: 'role-update',
        component: RoleUpdateComponent
      },
      {
        path: 'employee-update',
        component: EmployeeUpdateComponent
      }
    ]
  }
]
@NgModule({
  declarations: [UserManagementComponent, EmployeesComponent,
    RolesComponent, EmployeeUpdateComponent, RoleUpdateComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    NgSelectModule
  ]
})
export class UserManagementModule { }
