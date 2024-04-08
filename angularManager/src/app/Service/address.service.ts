import { Injectable } from '@angular/core';
import { TitleAndId } from 'src/app/Interface/title-and-id.interface';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  public titleAndId: TitleAndId[] = [];

  constructor() { }
}
