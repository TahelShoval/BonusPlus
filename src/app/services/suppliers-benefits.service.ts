import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import SuppliersBenefits from '../classes/suppliers-benefits';

@Injectable({
  providedIn: 'root'
})
export class SuppliersBenefitsService {
  url: string = `https://localhost:44357/api/SuppliersBenefits/`;

  constructor(private http: HttpClient) { }

  public GetAllDetailsSuppliersBenefits(): Observable<SuppliersBenefits[]> {
    return this.http.get<SuppliersBenefits[]>(`${this.url}GetAllDetailsSuppliersBenefits`);
  }

  public GetBenefitsByCategotyID(id: number): Observable<SuppliersBenefits[]> {
    return this.http.get<SuppliersBenefits[]>(`${this.url}GetBenefitsByCategotyID/` + id);
  }
}
