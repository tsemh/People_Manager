import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ViaCepController {

  private cep?: string;
  private baseUrl: string = `viacep.com.br/ws/${this.cep}/json/`;
  constructor(
    private http: HttpClient,
  ) {}

}