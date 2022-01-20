import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Worker from '../classes/worker';
import WorkersBenefits from '../classes/workers-benefits';

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

  public passwordReset(email: string) {
    this.http.delete(`${this.url}passwordReset/` + email).subscribe(() => console.log('email sent'));
  }

  public sendCoupon(obj: WorkersBenefits): Observable<any> {
    return this.http.put(`${this.url}SendCoupon/` , obj);
  }

  public deleteWorker(id: number): Observable<any> {
    return this.http.delete(`${this.url}DeleteWorker/` + id);
  }

  public updateWorker(worker: Worker): Observable<any> {
    return this.http.put(`${this.url}PutWorker/`, worker);
  }

  public addWorker(worker: Worker)  {
    return this.http.post<Worker>(`${this.url}PostWorker`, worker);
  }
}

