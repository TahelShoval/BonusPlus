import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Category from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url: string = `https://localhost:44357/api/Categories/`;

  constructor(private http:HttpClient) { }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}GetAllCategories`);
  }
}
