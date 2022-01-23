import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployerService } from 'src/app/services/employer.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  resetPasswordForm = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data: { type: string }, private workerservice: WorkerService, private employerService:EmployerService) { }
  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  getEmailError() {
    return this.resetPasswordForm.get('email')?.hasError('required') ? 'שדה חובה' :
      this.resetPasswordForm.get('email')?.hasError('email') ? 'כתובת מייל לא תקינה' : '';
  }

  onSubmit(resetPasswordForm: FormGroup) {
    if (resetPasswordForm.valid) {
      var email = resetPasswordForm.value.email;
      var newEmail = email;
      newEmail = newEmail.replace(/\./gi, "{}");
      newEmail = newEmail.replace(/\@/gi, "[]");
      if (this.data.type == "worker") {
        this.workerservice.getWorkerByEmail(newEmail).subscribe(res => {
          var worker = res;
          if (worker != null) {
            this.workerservice.passwordReset(newEmail);
            alert("הסיסמא נשלחה");
          }
          else {
            alert("כתובת מייל לא קיימת במערכת");
          }
        })
      }
      if (this.data.type == "management") {
        this.employerService.getEmployerByEmail(newEmail).subscribe(res => {
          var employer = res;
          if (employer != null) {
            this.employerService.passwordReset(newEmail);
            alert("הסיסמא נשלחה");
          }
          else {
            alert("כתובת מייל לא קיימת במערכת");
          }
        })
      }

    }
  }

}
