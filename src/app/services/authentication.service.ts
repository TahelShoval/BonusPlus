import { Injectable } from '@angular/core';
import { SignInData } from '../classes/signInData';
import { WorkerService } from './worker.service';
import Worker from 'src/app/classes/worker'
import { Router } from '@angular/router';
import { EmployerService } from './employer.service';
import Employer from '../classes/employer';
import { HeaderComponent } from '../components/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public worker: Worker = new Worker();
  public employer: Employer = new Employer();
  isAuthenticated = false;
  typeEntry = "";

  constructor(private workerService: WorkerService, private employerService: EmployerService, private router: Router) { }

  authenticate(signInData: SignInData) {
    if (signInData.getType() == "worker") {
      this.workerService.getWorkerByUserName(signInData.getUserName()).subscribe(res => { this.worker = res; })
      if (this.checkWorkerCredentials(signInData)) {
        this.isAuthenticated = true;
        this.typeEntry = "worker";
        this.router.navigate(['/private-area-worker/personal-benefits']);
        localStorage.setItem('worker', JSON.stringify(this.worker));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('typeEntry', 'worker');
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
        this.router.navigate(['/private-area-management/all-benefits']);
        localStorage.setItem('employer', JSON.stringify(this.employer));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('typeEntry', 'employer');
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
    return this.checkEmployerUserName(signInData.getUserName()) && this.checkEmployerPassword(signInData.getPassword());
  }

  private checkEmployerUserName(userName: string): boolean {
    return userName == this.employer.EmployerUserName;
  }

  checkEmployerPassword(password: string): boolean {
    return password == this.employer.EmployerPassword;
  }

  logout() {
    var entry = localStorage.getItem('typeEntry');
    if (entry)
      localStorage.removeItem(entry.toString());
    localStorage.removeItem('typeEntry');
    localStorage.setItem('isAuthenticated', 'false');
    this.isAuthenticated = false;
    this.typeEntry = "";
    this.router.navigate(['/']);
  }
}
