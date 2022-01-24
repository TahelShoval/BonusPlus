import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { MatDialog } from '@angular/material/dialog';
import Employer from 'src/app/classes/employer';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SignInData } from 'src/app/classes/signInData';


@Component({
  selector: 'app-sign-in-management',
  templateUrl: './sign-in-management.component.html',
  styleUrls: ['./sign-in-management.component.css']
})
export class SignInManagementComponent implements OnInit {

  hide = true;
  isFormInvalid = false;
  areCredentialsInvalid = false;
  signInForm = new FormGroup({});

  constructor(public dialog: MatDialog, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'userName': new FormControl("", [Validators.required]),
      'password': new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    })
  }

  getUserNameError() {
    return this.signInForm.get('userName')?.hasError('required') ? 'שדה חובה' : '';
  }

  getPasswordError() {
    return this.signInForm.get('password')?.hasError('required') ? 'שדה חובה' :
      this.signInForm.get('password')?.hasError('minlength') ? 'סיסמא לא תקינה' :
        this.signInForm.get('password')?.hasError('maxlength') ? 'סיסמא לא תקינה' : '';
  }

  onSubmit(signInForm: FormGroup) {
    if (!signInForm.valid) {
      this.isFormInvalid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(signInForm)
  }

  private checkCredentials(signInForm: FormGroup) {
    const signInData = new SignInData(signInForm.value.userName, signInForm.value.password, "employer");
    if (!this.authenticationService.authenticate(signInData)) {
      this.isFormInvalid = false;
      this.areCredentialsInvalid = true;
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      width: '350px', height: '400px',
      data: { type: "management" }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
