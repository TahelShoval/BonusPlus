import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  dialogRef: any;

  constructor() { }

  ngOnInit(): void {
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

}
