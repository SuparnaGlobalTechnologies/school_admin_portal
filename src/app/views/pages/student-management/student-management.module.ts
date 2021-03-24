import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { StudentManagementComponent } from './student-management.component';
import { StudentsComponent } from './students/students.component';
import { StudentUpdateComponent } from './student-update/student-update.component'
import {MatButtonModule} from '@angular/material/button';
// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';
import { GradesComponent } from './grades/grades.component';
import { GradeUpdateComponent } from './grade-update/grade-update.component';

const routes: Routes = [
  {
    path: '',
    component: StudentManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full'
      },
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'student-update',
        component: StudentUpdateComponent
      },
      {
        path: 'grades',
        component: GradesComponent
      },
      {
        path: 'grade-update',
        component: GradeUpdateComponent
      },

    ]
  }
]
@NgModule({
  declarations: [StudentManagementComponent,StudentsComponent,StudentUpdateComponent, GradesComponent, GradeUpdateComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    NgSelectModule
  ]
})
export class StudentManagementModule { }
