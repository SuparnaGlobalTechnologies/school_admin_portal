import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { SnakbarService } from '../../../../services/snakbar.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: any;
  validToken: string;
  screens: any;

  constructor( private snackBar: SnakbarService,
    private userservice: UserService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit() {
    console.log('hi')
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    const reqdata =  {
      username :  this.f.username.value,
      password :  this.f.password.value
    }
    this.userservice.Login(reqdata)
    .subscribe(
      data => {
        if(data.code === 200){
          localStorage.setItem('user', JSON.stringify(data.data));
          this.getScreens(JSON.stringify(data.data.role_id));
          localStorage.setItem('token', JSON.stringify(data.token));
          this.validToken = localStorage.getItem('token');
          localStorage.setItem('isLoggedin', 'true');
          if (localStorage.getItem('isLoggedin')) {
            this.router.navigate([this.returnUrl]);
          }
        }else{
         this.snackBar.error(data.error, 'ok');
        }
      },
      error => {
       this.snackBar.error(error.error, 'ok');
      });
  }

  getScreens(roleId){
    this.userservice.GetScreensByRole(roleId)
    .subscribe(
      data => {
        localStorage.setItem('menu', JSON.stringify(data.data));
       // this.screens = data.data;
        // this.userservice.SetScreens(data.data);
      },
      error => {
       this.snackBar.error(error.error, 'ok');
      });
  }

}
