import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import WorkerBenefits from '../classes/worker-benefits';

@Injectable({
  providedIn: 'root'
})
export class WorkersBenefitsService {
  url: string = `https://localhost:44357/api/WorkersBenefits/`;

  constructor(private http: HttpClient) { }
  
  public getSuppliersBenefitByWorkerId(workerId: number): Observable<WorkerBenefits[]> {
    return this.http.get<WorkerBenefits[]>(`${this.url}GetWorkersBenefitByWorkerId/` + workerId);
  }
}
