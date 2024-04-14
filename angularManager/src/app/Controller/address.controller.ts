import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AddressModel } from "../Model/address.model";
import { environment } from "src/environments/environment";
import { Observable, catchError } from "rxjs";
import { Injectable } from "@angular/core";
import { LoggerService } from "../Service/logger.service";

@Injectable({
  providedIn: 'root'
})
export class AddressController {
  
  private baseUrl: string = `${environment.baseUrl}/address`;
  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  
  getById(id: number): Observable<AddressModel> {
    return this.http.get<AddressModel>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => this.logger.handleError(error))
    );
  }

  post(newAddress: AddressModel, personId: number): Observable<AddressModel> {
    return this.http.post<AddressModel>(`${this.baseUrl}/${personId}`, newAddress).pipe(
      catchError((error: HttpErrorResponse) => this.logger.handleError(error))
    );
  }

  update(id: number, updatedAddress: AddressModel): Observable<AddressModel> {
    return this.http.patch<AddressModel>(`${this.baseUrl}/${id}`, updatedAddress).pipe(
      catchError((error: HttpErrorResponse) => this.logger.handleError(error))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => this.logger.handleError(error))
    );
  }


}