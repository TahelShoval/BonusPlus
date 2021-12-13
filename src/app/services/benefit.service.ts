import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Benefit from '../classes/benefit';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {
  url: string = `https://localhost:44357/api/Benefits/`;

  constructor(private http:HttpClient) { }

  public getAllBenefits(): Observable<Benefit[]> {
    return this.http.get<Benefit[]>(`${this.url}GetAllBenefits`);
  }
}
