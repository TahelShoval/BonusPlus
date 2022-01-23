import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SignInData } from 'src/app/classes/signInData';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in-worker',
  templateUrl: './sign-in-worker.component.html',
  styleUrls: ['./sign-in-worker.component.css']
})
export class SignInWorkerComponent implements OnInit {

  hide = true;
  isFormInvalid = false;
  areCredentialsInvalid = false;
  signInForm = new FormGroup({});

  constructor(public dialog: MatDialog, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'userName': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    })
  }

  getUserNameError() {
    return this.signInForm.get('userName')?.hasError('required') ? 'שדה חובה' : '';
  }

  getPasswordError() {
    return this.signInForm.get('password')?.hasError('required') ? 'שדה חובה' : '';
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
    const signInData = new SignInData(signInForm.value.userName, signInForm.value.password, "worker");
    if (!this.authenticationService.authenticate(signInData)) {
      this.isFormInvalid = false;
      this.areCredentialsInvalid = true;
    }
  }

  public openDialog(): void {
    
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      width: '370px', height: '400px',
      data: { type: "worker" }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

