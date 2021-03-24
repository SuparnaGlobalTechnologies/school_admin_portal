import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuizesComponent } from './quizes/quizes.component';
import { QuizManagementComponent } from './quiz-management.component';
import { QuizUpdateComponent } from './quiz-update/quiz-update.component'
const routes: Routes = [
  {
    path: '',
    component: QuizManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'quizes',
        pathMatch: 'full'
      },
      {
        path: 'quizes',
        component: QuizesComponent
      },
      {
        path: 'quiz-update',
        component: QuizUpdateComponent
      }



    ]
  }
]


@NgModule({
  declarations: [QuizManagementComponent, QuizesComponent, QuizUpdateComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    NgSelectModule
  ]
})
export class QuizManagementModule { }
