import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service'
import { SnakbarService } from '../../../../services/snakbar.service';
@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent implements OnInit {
  user: any;
  RoleForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: any;
  validToken: string;
  role: any;
  screens: any;
  selectedScreens:any;
  loadingIndicator: boolean;
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
    this.RoleForm = this.formBuilder.group({
      RoleId: ['', Validators.required],
      RoleName: ['', Validators.required],
      Screens: ['', Validators.required]
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getRole();
    this.getScreens();
    this.getRoleScreens();
  }

  getScreens() {
    this.userservice.GetScreens()
      .subscribe(
        data => {
          this.screens = data.data;
        //  this.selectedScreens = data.data;
          setTimeout(() => {
            this.loadingIndicator = false;
          }, 1500);
          console.log(data.data)
        },
        error => {
        });
  }

  getRole(){
    this.userservice.GetRole(this.route.snapshot.queryParamMap.get('role'))
    .subscribe(
        data => {
          if(data.code === 200){
            this.role = data.data[0];
            this.RoleForm.controls['RoleId'].setValue(this.role.cl_role_id);
            this.RoleForm.controls['RoleName'].setValue(this.role.cl_role_name);
          //  this.RoleForm.controls['RoleName'].setValue(this.role.screens);
          //  this.snackBar.success(data.message, 'ok');
          }else{
          //  this.snackBar.error(data.message, 'ok');
          }
        },
        error => {
         this.snackBar.error(error.message, 'ok');
        });
  }

  getRoleScreens(){
    this.userservice.getRoleScreens(this.route.snapshot.queryParamMap.get('role'))
    .subscribe(
        data => {
          if(data.code === 200){
            this.selectedScreens = data.data;
            console.log(this.selectedScreens);
          }else{
            this.snackBar.error(data.message, 'ok');
          }
        },
        error => {
         this.snackBar.error(error.message, 'ok');
        });
  }


  backToRoles(){
    this.router.navigateByUrl('/user-management/roles');
  }


   // convenience getter for easy access to form fields
   get f() { return this.RoleForm.controls; }


   onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     if (this.RoleForm.invalid) {
         return;
     }
     const screenVals = Object.keys(this.selectedScreens).map((key) => [this.selectedScreens[key].cl_screen_id]);
     const reqdata =  {
        RoleId :  this.f.RoleId.value,
        RoleName :  this.f.RoleName.value,
        Screens : screenVals
     }
     console.log(this.selectedScreens);
     this.userservice.UpdateRole(reqdata)
     .subscribe(
         data => {
           if(data.code === 200){
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
