import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import WorkerBenefits from '../classes/worker-benefits';
import WorkersBenefits from '../classes/workers-benefits';

@Injectable({
  providedIn: 'root'
})
export class WorkersBenefitsService {
  url: string = `https://localhost:44357/api/WorkersBenefits/`;

  constructor(private http: HttpClient) { }
  
  public getSuppliersBenefitByWorkerId(workerId: number): Observable<WorkerBenefits[]> {
    return this.http.get<WorkerBenefits[]>(`${this.url}GetWorkersBenefitByWorkerId/` + workerId);
  }

  public updateWorkerBenefit(workersBenefits: WorkersBenefits) {
    return this.http.put<WorkersBenefits>(`${this.url}PutWorkersBenefit`, workersBenefits);
  }

  public addWorkerBenefit(workerBenefit: WorkersBenefits) {
    return this.http.post<WorkersBenefits>(`${this.url}PostWorkersBenefit`, workerBenefit);
  }
}
