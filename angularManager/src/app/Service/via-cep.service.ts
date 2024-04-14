import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ViaCepController } from '../Controller/via-cep.controller';
import { ViaCepModel } from '../Model/via-cep.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private viaCepController: ViaCepController) { }

  getByCep(cep: string, peopleForm: FormGroup) {
    this.viaCepController.getByCep(cep).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (address: ViaCepModel | null) => {
        if (address !== null) {
          peopleForm.patchValue({
            cep: address.cep,
            address: address.logradouro,
            complement: address.complemento,
            neighborhood: address.bairro,
            city: address.localidade,
            state: address.uf
          });
        }
      },
      error: (error: any) => {
        console.error('Error finding person by ID:', error);
      }
    });
  }
}
