import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-sign-in-worker',
  templateUrl: './sign-in-worker.component.html',
  styleUrls: ['./sign-in-worker.component.css']
})
export class SignInWorkerComponent implements OnInit {

  hide = true;
  userName = "";
  password = "";

  constructor(public dialog: MatDialog) { }

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

  onSubmit() {
    // console.log(HomeService.getWorkerByUserPassword);
  }

}
