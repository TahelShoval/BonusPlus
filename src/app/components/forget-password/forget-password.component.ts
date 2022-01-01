import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  resetPasswordForm = new FormGroup({});

  constructor(private workerservice: WorkerService) { }
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
      console.log(newEmail)
      this.workerservice.getWorkerByEmail(newEmail).subscribe(res => {
        var worker = res;
        if (worker != null) {
          console.log(worker);
          alert("הסיסמא נשלחה");
        }
        else {
          alert("כתובת מייל לא קיימת במערכת");
        }
      })
    }
  }

}
