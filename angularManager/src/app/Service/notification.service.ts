import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TitleAndId } from '../Interface/title-and-id.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  idSelectedChanged: Subject<number> = new Subject<number>();
  titleAndIdChanged: Subject<TitleAndId[]> = new Subject<TitleAndId[]>();
}
