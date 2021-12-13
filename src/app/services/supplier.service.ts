import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Supplier from '../classes/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  url: string = `https://localhost:44357/api/Suppliers/`;

  constructor(private http: HttpClient) { }

  public getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.url}GetAllSuppliers`);
  }
}
