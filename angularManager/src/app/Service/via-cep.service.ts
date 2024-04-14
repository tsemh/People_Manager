import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ViaCepController } from '../Controller/via-cep.controller';
import { ViaCepModel } from '../Model/via-cep.model';
import { FormGroup } from '@angular/forms';
import { NotificationService } from './notification.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(
    private viaCepController: ViaCepController,
    private notificationService: NotificationService,
    private logger: LoggerService
  ) { }

  getByCep(cep: string, peopleForm: FormGroup) {
    return this.viaCepController.getByCep(cep).pipe(
      catchError((error: any) => {
        this.logger.handleError(error);
        this.notificationService.showError('Erro ao obter CEP. Por favor, tente novamente.');
        return of(null);
      })
    ).subscribe({
      next: (address: ViaCepModel | null) => {
        if (address !== null) {
          this.updateFormWithAddress(address, peopleForm);
        }
      },
      error: (error: any) => {
        console.error('Erro ao atualizar o formulário com o endereço:', error);
        this.notificationService.showError('Erro ao atualizar o formulário com o endereço.');
      }
    });
  }

  private updateFormWithAddress(address: ViaCepModel, peopleForm: FormGroup): void {
    peopleForm.patchValue({
      cep: address.cep,
      address: address.logradouro,
      complement: address.complemento,
      neighborhood: address.bairro,
      city: address.localidade,
      state: address.uf
    });
  }
}
