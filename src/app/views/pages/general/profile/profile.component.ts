import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service'
import { ConfirmedValidator } from '../confirmed.validator';
import { SnakbarService } from '../../../../services/snakbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  personalInfo: boolean;
  addressInfo: boolean;
  user: any;
  passwordInfo: boolean;
  passwordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: any;
  validToken: string;
  fieldTextType: boolean;

  constructor(private userservice: UserService,
              private formBuilder: FormBuilder,
              private snackBar: SnakbarService,
              private router: Router, private route: ActivatedRoute) {
              this.personalInfo = true;
              this.addressInfo = false;
              this.passwordInfo = false;
   }

  ngOnInit(): void {
        // get return url from route parameters or default to '/'
    this.passwordForm = this.formBuilder.group({
      CurrentPassword: ['', Validators.required],
      NewPassword: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    }, {
      validator: ConfirmedValidator('NewPassword', 'ConfirmPassword')
    });
    this.user = JSON.parse(localStorage.getItem('user'));
  }

toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

  activePersonalInfo(){
    this.personalInfo = true;
    this.addressInfo = false;
    this.passwordInfo = false;
  }

  activeAddressInfo(){
    this.personalInfo = false;
    this.addressInfo = true;
    this.passwordInfo = false;
  }
  activePasswordInfo(){
    this.personalInfo = false;
    this.addressInfo = false;
    this.passwordInfo = true;
  }

   // convenience getter for easy access to form fields
   get f() { return this.passwordForm.controls; }


   onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     if (this.passwordForm.invalid) {
         return;
     }
     const reqdata =  {

        CurrentPassword :  this.f.CurrentPassword.value,
        NewPassword :  this.f.NewPassword.value,
        user_id :  this.user.user_id
     }
     this.userservice.ChangePassword(reqdata)
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
