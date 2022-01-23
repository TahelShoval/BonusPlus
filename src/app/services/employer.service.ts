import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Employer from '../classes/employer';

@Injectable({
  providedIn: 'root'
})

export class EmployerService {

  url: string = `https://localhost:44357/api/Employers/`

  constructor(private http: HttpClient) { }

  public getEmployerByUserName(userName: string): Observable<Employer> {
    return this.http.get<Employer>(`${this.url}GetEmployerByUserName/` + userName);
  }

  public getEmployerByEmail(email: string): Observable<Employer> {
    return this.http.get<Employer>(`${this.url}GetEmployerByEmail/` + email);
  }

  public getEmployerById(id: number): Observable<Employer> {
    return this.http.get<Employer>(`${this.url}GetEmployerById/` + id);
  }

  public createNewEmployer(employer: Employer) {
    return this.http.post<Employer>(`${this.url}PostEmployer`, employer).subscribe(x => { });
  }

  public passwordReset(email: string) {
    this.http.delete(`${this.url}passwordReset/` + email).subscribe(() => console.log('email sent'));
  }

  public updateEmployer(employer: Employer) {
    return this.http.put<Employer>(`${this.url}PutEmployer`, employer);
  }
}
