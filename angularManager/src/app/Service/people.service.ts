import { AddressController } from './../Controller/address.controller';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { PeopleModel } from '../Model/people.model';
import { NotificationService } from './notification.service';
import { PeopleController } from '../Controller/people.controller';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  
  private idSelected!: number;
  private peopleSubject: BehaviorSubject<PeopleModel[]> = new BehaviorSubject<PeopleModel[]>([]);
  public people$: Observable<PeopleModel[]> = this.peopleSubject.asObservable();

  constructor(
    private notificationService: NotificationService,

    private peopleController: PeopleController,
    private addressController: AddressController) { }

  get idSelect():number {
    return this.idSelected;
  }
  set idSelect(newId: number) {
    if (newId !== this.idSelected) {
      this.notificationService.idSelectedChanged.next(newId);
    }
    this.idSelected = newId;
  }

  post(newPeople: PeopleModel) {
    this.peopleController.post(newPeople).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (createdPeople: PeopleModel | null) => {
        if (createdPeople !== null) {
        }
      },
      error: (error: any) => {
        console.error('Error creating new person:', error);
      }
    });
  }

  updatePeopleAndAddress(peopleInfo: any, addressInfo: any, addressId: number) {
    const peopleId = this.idSelect;

    this.peopleController.update(peopleId, peopleInfo)
      .subscribe({
        next: (updatedPerson: PeopleModel | null) => {
          if (updatedPerson !== null) {
            this.addressController.update(addressId, addressInfo);
          }
        },
        error: (error: any) => {
          console.error('Erro ao atualizar pessoa:', error);
        }
      });
  }

  update(peopleInfo: any) {
    const peopleId = this.idSelect;
    this.peopleController.update(peopleId, peopleInfo).subscribe({
      next: (updatedPerson: PeopleModel | null) => {
        if (updatedPerson !== null) {
        }
      },
      error: (error: any) => {
        console.error('Erro ao atualizar pessoa:', error);
      }
    });
  }
  getAll(page: number, limit: number) {
    this.peopleController.getAll(page, limit).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (people: PeopleModel[] | null) => {
        if (people !== null) {
          this.peopleSubject.next(people);
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  getById(id: number) {
    this.peopleController.getById(id).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (person: PeopleModel | null) => {
        if (person !== null) {
        }
      },
      error: (error: any) => {
        console.error('Error finding person by ID:', error);
      }
    });
  }

  search(query: string | number, page: number, limit: number) {
    this.peopleController.search(query, page, limit).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (people: PeopleModel[] | null) => {
        if (people !== null) {
          this.peopleSubject.next(people);
        }
      },
      error: (error: any) => {
        console.error('Error searching for people:', error);
      }
    });
  }

  delete(id: number) {
    this.peopleController.delete(id).pipe(
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
}
