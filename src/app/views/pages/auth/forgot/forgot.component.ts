import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { SnakbarService } from '../../../../services/snakbar.service';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: any;
  validToken: string;

  constructor(private snackBar: SnakbarService,
    private userservice: UserService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotForm.controls; }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotForm.invalid) {
      return;
    }
    const reqdata = {
      email: this.f.email.value,
    }
    this.userservice.Forgot(reqdata)
      .subscribe(
        data => {
          this.submitted = false;
          this.forgotForm.reset();

          this.snackBar.error(data.data, 'ok');
        },
        error => {
          this.snackBar.error(error.error, 'ok');
        });
  }


}
