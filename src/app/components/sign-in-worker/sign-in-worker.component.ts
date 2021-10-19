import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { NgForm } from '@angular/forms';
import { WorkerService } from 'src/app/services/worker.service';
import Worker from 'src/app/classes/worker';
import { SignInData } from 'src/app/classes/signInData';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in-worker',
  templateUrl: './sign-in-worker.component.html',
  styleUrls: ['./sign-in-worker.component.css']
})
export class SignInWorkerComponent implements OnInit {

  hide = true;
  userName = "";
  password = "";
  worker = new Worker();
  isFormInvalid = false;
  areCredentialsInvalid = false;


  constructor(public dialog: MatDialog, private authenticationService: AuthenticationService) { }

  public openDialog(): void {
    debugger;
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      width: '350px', height: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      this.isFormInvalid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(signInForm)
  }

  private checkCredentials(signInForm: NgForm) {
    const signInData = new SignInData(signInForm.value.userName, signInForm.value.password, "worker");
    if (!this.authenticationService.authenticate(signInData)) {
      this.isFormInvalid = false;
      this.areCredentialsInvalid = true;
    }
  }

}

