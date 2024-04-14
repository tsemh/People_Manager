import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ViaCepModel } from "../Model/via-cep.model";

@Injectable({
  providedIn: 'root'
})
export class ViaCepController {

  private baseUrl: string = `https://viacep.com.br/ws`;
  constructor(
    private http: HttpClient,
  ) {}

  getByCep(cep: string): Observable<ViaCepModel> {
    return this.http.get<ViaCepModel>(`${this.baseUrl}/${cep}/json`);
  }
}