import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service'
import { SnakbarService } from '../../../../services/snakbar.service';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.scss']
})
export class StudentUpdateComponent implements OnInit {
  user: any;
  StudentUpdateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: any;
  validToken: string;
  role: any;
  selectedGrade:any;
  loadingIndicator: boolean;
  userRole: any;
  userData: any;
  grades: any;
  screeenAuth: boolean;

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
        // get return url from route parameters or default to '/'
    this.StudentUpdateForm = this.formBuilder.group({
      StudentId: ['', Validators.required],
      StudentFirstName: ['', Validators.required],
      StudentLastName: ['', Validators.required],
      StudentPhone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      StudentEmail: ['', [Validators.required, Validators.email]],
      StudentGrade: ['', Validators.required],
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getGrades();
    this.getUser();
  }

  getGrades() {
    this.userservice.GetGrades()
      .subscribe(
        data => {
          this.grades = data.data;
          setTimeout(() => {
            this.loadingIndicator = false;
          }, 1500);
          console.log(data.data)
        },
        error => {
        });
  }

  getRole(){
    this.userservice.GetGrade(this.userData.cl_grade_id)
    .subscribe(
        data => {
          if(data.code === 200){
            this.selectedGrade = data.data[0];
            console.log(this.selectedGrade.cl_grade_id)
          }else{
            this.snackBar.error(data.message, 'ok');
          }
        },
        error => {
         this.snackBar.error(error.message, 'ok');
        });
  }

getUser(){
  this.userservice.GetStudentDetails(this.route.snapshot.queryParamMap.get('student'))
  .subscribe(
      data => {
        if(data.code === 200){
          this.userData = data.data[0];
          this.getRole();
          this.StudentUpdateForm.controls['StudentId'].setValue(this.userData.cl_user_id);
          this.StudentUpdateForm.controls['StudentFirstName'].setValue(this.userData.cl_user_first_name);
          this.StudentUpdateForm.controls['StudentLastName'].setValue(this.userData.cl_user_last_name);
          this.StudentUpdateForm.controls['StudentPhone'].setValue(this.userData.cl_user_phone);
          this.StudentUpdateForm.controls['StudentEmail'].setValue(this.userData.cl_user_email);

        }else{
          this.snackBar.error(data.message, 'ok');
        }
      },
      error => {
       this.snackBar.error(error.message, 'ok');
      });
}


goBack(){
    this.router.navigateByUrl('/student-management/students');
  }


   // convenience getter for easy access to form fields
   get f() { return this.StudentUpdateForm.controls; }


   onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     if (this.StudentUpdateForm.invalid) {
         return;
     }
     console.log(this.selectedGrade);
     const reqdata =  {
      StudentFirstName :  this.f.StudentFirstName.value,
      StudentLastName :  this.f.StudentLastName.value,
      StudentPhone :  this.f.StudentPhone.value,
      StudentEmail :  this.f.StudentEmail.value,
      StudentId : this.route.snapshot.queryParamMap.get('student'),
      StudentGrade : this.selectedGrade.cl_grade_id
     }

    this.userservice.updateStudent(reqdata)
     .subscribe(
         data => {
           if(data.code === 200){
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
