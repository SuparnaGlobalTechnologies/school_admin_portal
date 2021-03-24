import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as Feather from 'feather-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { SnakbarService } from '../../../../services/snakbar.service';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class EmployeesComponent implements OnInit {

  roles = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  creatEmpDiv: any;
  NewEmpForm: FormGroup;
  loading = false;
  submitted = false;
  selectedRole:any;
  value=[];
  rows: any;
  checkPhone: boolean;
  checkEmail: boolean;
  screeenAuth: boolean;
  user: any;
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
    this.user = JSON.parse(localStorage.getItem('user'));
    this.NewEmpForm = this.formBuilder.group({
      EmpFirstName: ['', Validators.required],
      EmpLastName: ['', Validators.required],
      EmpPhone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      EmpEmail: ['', [Validators.required, Validators.email]],
      Role: ['', Validators.required],
    });
    Feather.replace();
    this.getRoles();
    this.getUsers();
  }

  empDivSwitch(val):void{
    this.creatEmpDiv = val;
  }

  getRoles() {
    this.userservice.GetRoles()
      .subscribe(
        data => {
          this.roles = data.data;
          setTimeout(() => {
            this.loadingIndicator = false;
          }, 1500);
          console.log(data.data)
        },
        error => {
        });
  }


  getUsers() {
    this.userservice.GetUsers()
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
   get f() { return this.NewEmpForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.NewEmpForm.invalid || this.checkEmail || this.checkPhone) {
        return;
    }
    const reqdata =  {
       EmpFirstName :  this.f.EmpFirstName.value,
       EmpLastName :  this.f.EmpLastName.value,
       EmpPhone :  this.f.EmpPhone.value,
       EmpEmail :  this.f.EmpEmail.value,
       Role :  this.selectedRole.cl_role_id,
       clientId : this.user.client_id
    }
    this.userservice.CreateEmp(reqdata)
    .subscribe(
        data => {
          if(data.code === 200){
            this.NewEmpForm.reset();
            this.submitted = false;
            this.getUsers();
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

  CheckMailExists(){
    if(this.f.EmpEmail.value !== ''){
      this.userservice.CheckMailExists(this.f.EmpEmail.value)
      .subscribe(
        data => {
          this.checkEmail = false;
        },
        error => {
          this.checkEmail = true;
        });
    }

  }

  CheckPhoneExists(){
    if(this.f.EmpPhone.value !== ''){
      this.userservice.CheckPhoneExists(this.f.EmpPhone.value)
      .subscribe(
        data => {
          this.checkPhone = false;
        },
        error => {
          this.checkPhone = true;
        });
    }

  }
}
