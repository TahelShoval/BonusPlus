import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Address from '../classes/address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {
  url: string = `https://localhost:44357/api/Address/`


  constructor(private http: HttpClient) { }

  public getAddressByZipCode(zipCode: number): Observable<any> {

    return this.http.get<Address>(`${this.url}GetAddressByZipCode/` + zipCode);
  }

  public createNewAddress(address: Address): Observable<any> {
    return this.http.post<Address>(`${this.url}PostAddress`, address);
  }
}
