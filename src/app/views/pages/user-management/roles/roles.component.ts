import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as Feather from 'feather-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { SnakbarService } from '../../../../services/snakbar.service';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class RolesComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  creatRoleDiv: any;
  NewRoleForm: FormGroup;
  loading = false;
  submitted = false;
  selectedScreens:any;
  screens: any;
  value=[];
  screeenAuth: boolean;
  constructor(private userservice: UserService,
    private formBuilder: FormBuilder,
    private snackBar: SnakbarService,
    private router: Router, private route: ActivatedRoute) {
      const screens = JSON.parse(localStorage.getItem('menu'));
      if (screens.some((item) => item.cl_screen_key === 'User-Management')) {
        this.screeenAuth = true;
      }else{
        this.screeenAuth = false;
      }
     }

  ngOnInit(): void {
    this.NewRoleForm = this.formBuilder.group({
      Screens: ['', Validators.required],
      RoleName: ['', Validators.required]
    });
    Feather.replace();
    this.getRoles();
    this.getScreens();
  }

  roleDivSwitch(val):void{
    this.creatRoleDiv = val;
  }


  editRole(val) {
  }

  deleteRole(val) {
  }

  getRoles() {
    this.userservice.GetRoles()
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

  getScreens() {
    this.userservice.GetScreens()
      .subscribe(
        data => {
          this.screens = data.data;
          setTimeout(() => {
            this.loadingIndicator = false;
          }, 1500);
          console.log(data.data)
        },
        error => {
        });
  }


   // convenience getter for easy access to form fields
   get f() { return this.NewRoleForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.NewRoleForm.invalid) {
        return;
    }
    const obj = this.selectedScreens;
    const screenVals = Object.keys(obj).map((key) => [obj[key].screen_id]);
    const reqdata =  {
       RoleName :  this.f.RoleName.value,
       Screens :  screenVals
    }
    this.userservice.CreateRole(reqdata)
    .subscribe(
        data => {
          if(data.code === 200){
          this.NewRoleForm.reset();
          this.submitted = false;
          this.getRoles();
           this.snackBar.success(data.data, 'ok');
          }else{
           this.snackBar.error(data.data, 'ok');
          }
        },
        error => {
         this.snackBar.error(error.message, 'ok');
         console.log(error)
        });
  }
}
