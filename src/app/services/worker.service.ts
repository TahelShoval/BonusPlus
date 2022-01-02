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

  public getWorkersByEmployerId(employerId: number): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.url}GetWorkersByEmployerId/` + employerId);
  }

  public getWorkerByUserName(userName: string): Observable<Worker> {
    return this.http.get<Worker>(`${this.url}GetWorkerByUserName/` + userName);
  }

  public getWorkerByEmail(email: string): Observable<Worker> {
    return this.http.get<Worker>(`${this.url}GetWorkerByEmail/` + email);
  }

  public sendEmail(email: string) {
    debugger;
    this.http.delete(`${this.url}sendEmail/` + email).subscribe(() => console.log(''));
  }

  public deleteWorker(id: number) {
    this.http.delete(`${this.url}DeleteWorker/` + id).subscribe(() => console.log('Delete successful'));
  }

  public updateWorker(worker: Worker) {
    this.http.put(`${this.url}PutWorker/`, worker).subscribe(() => console.log('Put successful'));
  }

  public addWorker(worker: Worker) {
    return this.http.post<Worker>(`${this.url}PostWorker`, worker).subscribe(x => { })
  }
}

