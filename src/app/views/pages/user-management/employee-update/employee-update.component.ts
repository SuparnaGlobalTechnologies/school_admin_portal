import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service'
import { SnakbarService } from '../../../../services/snakbar.service';
@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  user: any;
  EmpUpdateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: any;
  validToken: string;
  role: any;
  selectedRole:any;
  loadingIndicator: boolean;
  userRole: any;
  userData: any;
  roles: any;
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
        // get return url from route parameters or default to '/'
    this.EmpUpdateForm = this.formBuilder.group({
      EmpId: ['', Validators.required],
      EmpFirstName: ['', Validators.required],
      EmpLastName: ['', Validators.required],
      EmpPhone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      EmpEmail: ['', [Validators.required, Validators.email]],
      Role: ['', Validators.required],
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getRoles();
    this.getUser();
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

getUser(){
  this.userservice.GetUserDetails(this.route.snapshot.queryParamMap.get('employee'))
  .subscribe(
      data => {
        if(data.code === 200){
          this.userData = data.data[0];
          this.getRole();
          this.EmpUpdateForm.controls['EmpId'].setValue(this.userData.cl_user_id);
          this.EmpUpdateForm.controls['EmpFirstName'].setValue(this.userData.cl_user_first_name);
          this.EmpUpdateForm.controls['EmpLastName'].setValue(this.userData.cl_user_last_name);
          this.EmpUpdateForm.controls['EmpPhone'].setValue(this.userData.cl_user_phone);
          this.EmpUpdateForm.controls['EmpEmail'].setValue(this.userData.cl_user_email);

        }else{
          this.snackBar.error(data.message, 'ok');
        }
      },
      error => {
       this.snackBar.error(error.message, 'ok');
      });
}

getRole(){
  this.userservice.GetRole(this.userData.cl_user_role_id)
  .subscribe(
      data => {
        if(data.code === 200){
          this.selectedRole = data.data[0];
        }else{
          this.snackBar.error(data.message, 'ok');
        }
      },
      error => {
       this.snackBar.error(error.message, 'ok');
      });
}


backToEmployees(){
    this.router.navigateByUrl('/user-management/employees');
  }


   // convenience getter for easy access to form fields
   get f() { return this.EmpUpdateForm.controls; }


   onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     if (this.EmpUpdateForm.invalid) {
         return;
     }
     const reqdata =  {
      EmpFirstName :  this.f.EmpFirstName.value,
      EmpLastName :  this.f.EmpLastName.value,
      EmpPhone :  this.f.EmpPhone.value,
      EmpEmail :  this.f.EmpEmail.value,
      EmpId : this.route.snapshot.queryParamMap.get('employee'),
      EmpRole : this.selectedRole.cl_role_id
     }
    this.userservice.updateEmployee(reqdata)
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
