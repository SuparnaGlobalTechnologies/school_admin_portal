import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service'
import { SnakbarService } from '../../../../services/snakbar.service';

@Component({
  selector: 'app-grade-update',
  templateUrl: './grade-update.component.html',
  styleUrls: ['./grade-update.component.scss']
})
export class GradeUpdateComponent implements OnInit {
  user: any;
  GradeUpdateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: any;
  validToken: string;
  loadingIndicator: boolean;
  userData: any;
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
    this.GradeUpdateForm = this.formBuilder.group({
      GradeId: ['', Validators.required],
      GradeName: ['', Validators.required]
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getBranch();
  }

getBranch(){
  this.userservice.GetGradeDetails(this.route.snapshot.queryParamMap.get('grade'))
  .subscribe(
      data => {
        if(data.code === 200){
          this.userData = data.data[0];
          this.GradeUpdateForm.controls['GradeId'].setValue(this.userData.cl_grade_id);
          this.GradeUpdateForm.controls['GradeName'].setValue(this.userData.cl_grade_name);

        }else{
          this.snackBar.error(data.data, 'ok');
        }
      },
      error => {
       this.snackBar.error(error.data, 'ok');
      });
}



goback(){
    this.router.navigateByUrl('/student-management/grades');
  }


   // convenience getter for easy access to form fields
   get f() { return this.GradeUpdateForm.controls; }


   onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     if (this.GradeUpdateForm.invalid) {
         return;
     }
     const reqdata =  {
      GradeName :  this.f.GradeName.value,
      GradeId : this.route.snapshot.queryParamMap.get('grade'),
     }
    this.userservice.updateGrade(reqdata)
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
