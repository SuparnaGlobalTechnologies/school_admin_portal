import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as Feather from 'feather-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { SnakbarService } from '../../../../services/snakbar.service';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class StudentsComponent implements OnInit {

  roles = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  createStuDiv: any;
  NewStuForm: FormGroup;
  loading = false;
  submitted = false;
  value=[];
  rows: any;
  checkPhone: boolean;
  checkEmail: boolean;
  screeenAuth: boolean;
  selectedGrade:any;
  user: any;
  grades: any;
  constructor(private userservice: UserService,
    private formBuilder: FormBuilder,
    private snackBar: SnakbarService,
    private router: Router, private route: ActivatedRoute) {
      const screens = JSON.parse(localStorage.getItem('menu'));

      if (screens.some((item) => item.cl_screen_key === 'Student-Management')) {
        this.screeenAuth = true;
      }else{
        this.screeenAuth = false;
      }
     }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.NewStuForm = this.formBuilder.group({
      StuFirstName: ['', Validators.required],
      StuLastName: ['', Validators.required],
      StuPhone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      StuEmail: ['', [Validators.required, Validators.email]],
      Grades: ['', Validators.required],
    });
    Feather.replace();
    this.getGrades();
    this.getStudents();
  }

  stuDivSwitch(val):void{
    this.createStuDiv = val;
  }

  getGrades() {
    this.userservice.GetGrades()
      .subscribe(
        data => {
          this.grades = data.data;
        },
        error => {
        });
  }


  getStudents() {
    this.userservice.GetStudents()
      .subscribe(
        data => {
          this.rows = data.data;
        },
        error => {
        });
  }
   // convenience getter for easy access to form fields
   get f() { return this.NewStuForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.NewStuForm.invalid || this.checkEmail || this.checkPhone) {
        return;
    }

    const reqdata =  {
       StudentFirstName :  this.f.StuFirstName.value,
       StudentLastName :  this.f.StuLastName.value,
       StudentPhone :  this.f.StuPhone.value,
       StudentEmail :  this.f.StuEmail.value,
       clientId : this.user.client_id,
       StudentGrade :  this.selectedGrade[0].cl_grade_id
    }
    this.userservice.CreateStudent(reqdata)
    .subscribe(
        data => {
          if(data.code === 200){
            this.NewStuForm.reset();
            this.submitted = false;
            this.getStudents();
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
    if(this.f.StuEmail.value !== ''){
      this.userservice.CheckMailExists(this.f.StuEmail.value)
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
    if(this.f.StuPhone.value !== ''){
      this.userservice.CheckPhoneExists(this.f.StuPhone.value)
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
