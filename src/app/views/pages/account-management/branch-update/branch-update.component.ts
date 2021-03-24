import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service'
import { SnakbarService } from '../../../../services/snakbar.service';

@Component({
  selector: 'app-branch-update',
  templateUrl: './branch-update.component.html',
  styleUrls: ['./branch-update.component.scss']
})
export class BranchUpdateComponent implements OnInit {
  user: any;
  BranchUpdateForm: FormGroup;
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
                if (screens.some((item) => item.cl_screen_key === 'Account-Management')) {
                  this.screeenAuth = true;
                }else{
                  this.screeenAuth = false;
                }
   }

  ngOnInit(): void {
        // get return url from route parameters or default to '/'
    this.BranchUpdateForm = this.formBuilder.group({
      BranchId: ['', Validators.required],
      BranchName: ['', Validators.required],
      BranchAddress: ['', Validators.required],
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getBranch();
  }

getBranch(){
  this.userservice.GetBranchDetails(this.route.snapshot.queryParamMap.get('branch'))
  .subscribe(
      data => {
        if(data.code === 200){
          this.userData = data.data[0];
          this.BranchUpdateForm.controls['BranchId'].setValue(this.userData.cl_branch_id);
          this.BranchUpdateForm.controls['BranchName'].setValue(this.userData.cl_branch_name);
          this.BranchUpdateForm.controls['BranchAddress'].setValue(this.userData.cl_branch_address);

        }else{
          this.snackBar.error(data.data, 'ok');
        }
      },
      error => {
       this.snackBar.error(error.data, 'ok');
      });
}



backToEmployees(){
    this.router.navigateByUrl('/user-management/employees');
  }


   // convenience getter for easy access to form fields
   get f() { return this.BranchUpdateForm.controls; }


   onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     if (this.BranchUpdateForm.invalid) {
         return;
     }
     const reqdata =  {
      BranchName :  this.f.BranchName.value,
      BranchAddress :  this.f.BranchAddress.value,
      BranchId : this.route.snapshot.queryParamMap.get('branch'),
     }
    this.userservice.updateBranch(reqdata)
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
