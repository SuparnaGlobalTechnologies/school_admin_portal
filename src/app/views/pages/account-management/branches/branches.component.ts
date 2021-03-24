import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as Feather from 'feather-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { SnakbarService } from '../../../../services/snakbar.service';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class BranchesComponent implements OnInit {
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  createBranchDiv: any;
  NewBranchForm: FormGroup;
  loading = false;
  submitted = false;
  value=[];
  rows: any;
  screeenAuth: boolean;
  user: any;
  constructor(private userservice: UserService,
    private formBuilder: FormBuilder,
    private snackBar: SnakbarService,
    private router: Router, private route: ActivatedRoute) {
      const screens = JSON.parse(localStorage.getItem('menu'));

      if (screens.some((item) => item.cl_screen_key === 'Account-Management')) {
        this.screeenAuth = true;
      }else{
        this.screeenAuth = false;
      }
     }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.NewBranchForm = this.formBuilder.group({
      BranchName: ['', Validators.required],
      BranchAddress: ['', Validators.required]
    });
    Feather.replace();
    this.getbranches();
  }

  branchDivSwitch(val):void{
    this.createBranchDiv = val;
  }




  getbranches() {
    this.userservice.GetBranches()
      .subscribe(
        data => {
          this.rows = data.data;
          setTimeout(() => {
            this.loadingIndicator = false;
          }, 1500);
          console.log(data.data)
        },
        error => {
        });
  }
   // convenience getter for easy access to form fields
   get f() { return this.NewBranchForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.NewBranchForm.invalid) {
        return;
    }
    const reqdata =  {
       BranchName :  this.f.BranchName.value,
       BranchAddress :  this.f.BranchAddress.value,
       clientId : this.user.client_id
    }
    this.userservice.CreateBranch(reqdata)
    .subscribe(
        data => {
          if(data.code === 200){
            this.NewBranchForm.reset();
            this.submitted = false;
            this.getbranches();
           this.snackBar.success(data.data, 'ok');
          }else{
           this.snackBar.error(data.data, 'ok');
          }
        },
        error => {
         this.snackBar.error(error.data, 'ok');
         console.log(error)
        });
  }


}
