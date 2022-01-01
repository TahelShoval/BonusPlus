import { Component, OnInit } from '@angular/core';
import Employer from 'src/app/classes/employer';
import Worker from 'src/app/classes/worker';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  typeEntry: string = "";
  isAuthenticated: boolean = false;
  worker: Worker = new Worker();
  employer: Employer = new Employer();

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    const typeEntry = localStorage.getItem('typeEntry');
    if (typeEntry) {
      this.typeEntry = typeEntry;
      this.isAuthenticated = true;
      if (this.typeEntry == "worker") {
        const worker = localStorage.getItem('worker');
        if (worker)
          this.worker = JSON.parse(worker);
      }
      else if (this.typeEntry == "employer") {
        const employer = localStorage.getItem('employer');
        if (employer)
          this.employer = JSON.parse(employer);
      }
    }
  }

  logout() {
    this.typeEntry = "";
    this.isAuthenticated = false;
    this.worker = new Worker();
    this.employer = new Employer();
    this.authenticationService.logout();
  }

}
