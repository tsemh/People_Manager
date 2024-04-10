import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TitleAndId } from 'src/app/Interface/title-and-id.interface';
import { environment } from 'src/environments/environment';
import { AddressModel } from '../Model/address.model';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private titleAndId: TitleAndId[] = [];
  private baseUrl: string = `${environment.baseUrl}/address`;
  private addressInfo!:any;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

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

  getById(id: number): Observable<AddressModel> {
    return this.http.get<AddressModel>(`${this.baseUrl}/${id}`);
  }

  save(newAddress: AddressModel): Observable<AddressModel> {
    return this.http.post<AddressModel>(this.baseUrl, newAddress);
  }

  update(id: number, updatedAddress: AddressModel): Observable<AddressModel> {
    return this.http.patch<AddressModel>(`${this.baseUrl}/${id}`, updatedAddress);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
