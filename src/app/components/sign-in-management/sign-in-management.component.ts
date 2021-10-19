import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  userName = "";
  password = "";
  employer = new Employer;
  
  constructor(public dialog: MatDialog, private authenticationService:AuthenticationService) { }

  public openDialog(): void {
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
    const signInData = new SignInData(signInForm.value.userName, signInForm.value.password, "employer");
    this.authenticationService.authenticate(signInData);
  }
}
