import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Worker from '../classes/worker';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
 url:string = `https://localhost:44357/api/Workers/`

  constructor(private http:HttpClient) { }

  public getWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.url}GetAllWorkers`);
  }

  public getWorkerByUserPassword(): Observable<Worker> {
    return this.http.get<Worker>(`${this.url}GetWorkerByUserPassword/{worker}`);
  }
}
