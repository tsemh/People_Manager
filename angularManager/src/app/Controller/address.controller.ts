import { HttpClient } from "@angular/common/http";
import { AddressModel } from "../Model/address.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AddressController {
  
  private baseUrl: string = `${environment.baseUrl}/address`;
  constructor(
    private http: HttpClient,
  ) {}

  
  getById(id: number): Observable<AddressModel> {
    return this.http.get<AddressModel>(`${this.baseUrl}/${id}`);
  }

  post(newAddress: AddressModel, personId: number): Observable<AddressModel> {
    return this.http.post<AddressModel>(`${this.baseUrl}/${personId}`, newAddress);
  }

  update(id: number, updatedAddress: AddressModel): Observable<AddressModel> {
    return this.http.patch<AddressModel>(`${this.baseUrl}/${id}`, updatedAddress);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


}