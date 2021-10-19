import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  email: string = '';

  constructor(private workerservice: WorkerService) { }
  ngOnInit(): void {
  }

  onSubmit(resetPasswordForm: NgForm) {
    if (resetPasswordForm.valid) {
      this.email = resetPasswordForm.value.email;
      var newEmail = this.email;
      newEmail = newEmail.replace(/\./gi, "{}");
      newEmail = newEmail.replace(/\@/gi, "[]");
      console.log(newEmail)
      debugger;
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

      // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      // this.http.post('https://formspree.io/asdlf7asdf',
      //   { name: email.name, replyto: email.email, message: email.messages },
      //   { 'headers': headers }).subscribe(
      //     response => {
      //       console.log(response);
      //     }
      //   );
    }
  }

}
