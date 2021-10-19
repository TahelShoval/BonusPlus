import { Injectable } from '@angular/core';
import { SignInData } from '../classes/signInData';
import { WorkerService } from './worker.service';
import Worker from 'src/app/classes/worker'
import { Router } from '@angular/router';
import { EmployerService } from './employer.service';
import Employer from '../classes/employer';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private worker: Worker = new Worker();
  private employer: Employer = new Employer();
  isAuthenticated = false;
  typeEntry = "";

  constructor(private workerService: WorkerService, private employerService: EmployerService, private router: Router) { }

  authenticate(signInData: SignInData) {
    if (signInData.getType() == "worker") {
      this.workerService.getWorkerByUserName(signInData.getUserName()).subscribe(res => { this.worker = res; })
      if (this.checkWorkerCredentials(signInData)) {
        this.isAuthenticated = true;
        this.typeEntry = "worker";
        this.router.navigate(['']);
        console.log("worker");
        console.log(this.worker);
        return true;
      }
      this.isAuthenticated = false;
      this.typeEntry = "";
      return false;
    }
    else if (signInData.getType() == "employer") {
      this.employerService.getEmployerByUserName(signInData.getUserName()).subscribe(res => { this.employer = res; })
      if (this.checkEmployerCredentials(signInData)) {
        this.isAuthenticated = true;
        this.typeEntry = "employer";
        this.router.navigate(['']);
        console.log("employer");
        console.log(this.employer);
        return true;
      }
      this.isAuthenticated = false;
      this.typeEntry = "";
      return false;
    }
    this.isAuthenticated = false;
    this.typeEntry = "";
    return false;
  }

  private checkWorkerCredentials(signInData: SignInData): boolean {
    return this.checkWorkerUserName(signInData.getUserName()) && this.checkWorkerPassword(signInData.getPassword());
  }

  private checkWorkerUserName(userName: string): boolean {
    return userName == this.worker.WorkerUserName;
  }

  checkWorkerPassword(password: string): boolean {
    return password == this.worker.WorkerPassword;
  }

  private checkEmployerCredentials(signInData: SignInData): boolean {
    debugger;
    return this.checkEmployerUserName(signInData.getUserName()) && this.checkEmployerPassword(signInData.getPassword());
  }

  private checkEmployerUserName(userName: string): boolean {
    return userName == this.employer.EmployerUserName;
  }

  checkEmployerPassword(password: string): boolean {
    return password == this.employer.EmployerPassword;
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }
}
