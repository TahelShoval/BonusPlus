import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Worker from '../classes/worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  url: string = `https://localhost:44357/api/Workers/`

  constructor(private http: HttpClient) { }

  public getAllWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.url}GetAllWorkers`);
  }

  public getWorkerByUserName(userName: string): Observable<Worker> {
    return this.http.get<Worker>(`${this.url}GetWorkerByUserName/` + userName);
  }

  public getWorkerByEmail(email: string): Observable<Worker> {
    return this.http.get<Worker>(`${this.url}GetWorkerByEmail/` + email);
  }
}
