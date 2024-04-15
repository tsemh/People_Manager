import { Injectable } from '@angular/core';
import { TitleAndId } from 'src/app/Interface/title-and-id.interface';
import { NotificationService } from './notification.service';
import { AddressModel } from '../Model/address.model';
import { catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { AddressController } from './../Controller/address.controller';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private titleAndId: TitleAndId[] = [];
  private addressInfo!: any;

  constructor(
    private notificationService: NotificationService,
    private addressController: AddressController,
  ) { }

  get infoAddress(): any {
    return this.addressInfo;
  }
  set infoAddress(addressInfo: any) {
    this.addressInfo = addressInfo;
  }

  get idAndTitle(): TitleAndId[] {
    return this.titleAndId;
  }
  set idAndTitle(novoValor: TitleAndId[]) {
    if (JSON.stringify(novoValor) !== JSON.stringify(this.titleAndId)) {
      this.notificationService.titleAndIdChanged.next(novoValor);
    }
    this.titleAndId = novoValor;
  }

  update(addressId: number, addressInfo: any) {
    this.addressController.update(addressId, addressInfo)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error ('Erro ao atualizar endereço'));
        })
      )
      .subscribe({
        next: (updatedAddress: AddressModel | null) => {
          if (updatedAddress !== null) {
            console.log('Endereço atualizado com sucesso:', updatedAddress);
            this.notificationService.showSuccess('Endereço atualizado com sucesso');
          }
        }
      });
  }
  
  post(newAddress: AddressModel, personId: number) {
    this.addressController.post(newAddress, personId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError('Erro ao criar endereço');
          return throwError(() => new Error ('Erro ao criar endereço'));
        })
      )
      .subscribe({
        next: (createdAddress: AddressModel | null) => {
          if (createdAddress !== null) {
            console.log('Novo endereço criado com sucesso:', createdAddress);
            this.notificationService.showSuccess('Novo endereço criado com sucesso');
          }
        }
      });
  }
  
  delete(id: number) {
    this.addressController.delete(id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError('Erro ao excluir endereço');
          return throwError(() => new Error ('Erro ao excluir endereço'));
        })
      )
      .subscribe({
        next: () => {
          console.log('Endereço excluído com sucesso');
          this.notificationService.showSuccess('Endereço excluído com sucesso');
        }
      });
  }
  
  getById(id: number, peopleForm: FormGroup) {
    this.addressController.getById(id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError('Erro ao encontrar endereço pelo ID');
          return throwError(() => new Error ('Erro ao encontrar endereço pelo ID'));
        })
      )
      .subscribe({
        next: (address: AddressModel | null) => {
          if (address !== null) {
            peopleForm.get('address')?.patchValue(address);
          }
        }
      });
  }
}
