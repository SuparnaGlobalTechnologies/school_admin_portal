import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as Feather from 'feather-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { SnakbarService } from '../../../../services/snakbar.service';
@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss']
})
export class QuizesComponent implements OnInit {

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  loading = false;
  rows: any;
  screeenAuth:any;
  constructor(private userservice: UserService,
    private snackBar: SnakbarService,
    private router: Router, private route: ActivatedRoute) {
      const screens = JSON.parse(localStorage.getItem('menu'));
      if (screens.some((item) => item.screen_key === 'Quiz-Management')) {
        this.screeenAuth = true;
      }else{
        this.screeenAuth = false;
      }
     }


  ngOnInit(): void {
    this.getQuizes();
    this.loadingIndicator = false;
  }


  getQuizes() {
    this.userservice.GetQuizes()
      .subscribe(
        data => {
          this.rows = data.data;
        },
        error => {
        });
  }

}
