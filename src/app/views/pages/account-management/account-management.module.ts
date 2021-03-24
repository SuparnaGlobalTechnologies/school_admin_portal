import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AccountManagementComponent } from './account-management.component';
import { BranchesComponent } from './branches/branches.component';
import { BranchUpdateComponent } from './branch-update/branch-update.component'
import {MatButtonModule} from '@angular/material/button';
// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: AccountManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'branches',
        pathMatch: 'full'
      },
      {
        path: 'branches',
        component: BranchesComponent
      },
      {
        path: 'branch-update',
        component: BranchUpdateComponent
      },

    ]
  }
]
@NgModule({
  declarations: [AccountManagementComponent,BranchesComponent,BranchUpdateComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    NgSelectModule
  ]
})
export class AccountManagementModule { }
