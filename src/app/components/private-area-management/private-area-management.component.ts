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

  constructor() { }

  ngOnInit(): void {
  }

}
