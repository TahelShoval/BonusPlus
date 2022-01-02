import { Component, OnInit } from '@angular/core';
import Worker from 'src/app/classes/worker';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-private-area-management',
  templateUrl: './private-area-management.component.html',
  styleUrls: ['./private-area-management.component.css']
})
export class PrivateAreaManagementComponent implements OnInit {

  title: string = "כל ההטבות"

  constructor() { }

  ngOnInit(): void {
  }

  changeTitle(n: number) {
    if (n == 1)
      this.title = "כל ההטבות";
    if (n == 2)
      this.title = "פרטי עובדים";
    if (n == 3)
      this.title = "הפרטים שלי";
  }

}
