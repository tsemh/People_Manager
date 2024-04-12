import { AddressController } from './../Controller/address.controller';
import { Injectable } from '@angular/core';
import { TitleAndId } from 'src/app/Interface/title-and-id.interface';
import { NotificationService } from './notification.service';
import { AddressModel } from '../Model/address.model';
import { catchError, of } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private titleAndId: TitleAndId[] = [];
  private addressInfo!:any;

  constructor(
    private notificationService: NotificationService,

    private addressController: AddressController) { }

  get infoAddress():any {
    return this.addressInfo;
  }
  set infoAddress(addressInfo: any) {
    this.addressInfo = addressInfo;
  }

  get idAndTitle():TitleAndId[] {
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
    .subscribe({
      next: (updatedAddress: AddressModel | null) => {
        if (updatedAddress !== null) {
          console.log('Endereço atualizado com sucesso:', updatedAddress);
        }
      },
      error: (error: any) => {
        console.error('Erro ao atualizar endereço:', error);
      }
    });
  }
  post(newAddress: AddressModel, personId: number) {
    this.addressController.post(newAddress, personId).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (createAddress: AddressModel | null) => {
        if (createAddress !== null) {
        }
      },
      error: (error: any) => {
        console.error('Error creating new person:', error);
      }
    });
  }
  delete(id: number) {
    this.addressController.delete(id).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: () => {
      },
      error: (error: any) => {
        console.error('Error deleting person:', error);
      }
    });
  }
  getById(id: number, peopleForm: FormGroup) {
    this.addressController.getById(id).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (address: AddressModel | null) => {
        if (address !== null) {
          peopleForm.get('address')?.patchValue(address);
        }
      },
      error: (error: any) => {
        console.error('Error finding person by ID:', error);
      }
    });
  }
}
