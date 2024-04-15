import { AddressController } from './../Controller/address.controller';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { PeopleModel } from '../Model/people.model';
import { NotificationService } from './notification.service';
import { PeopleController } from '../Controller/people.controller';
import { LoggerService } from './logger.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private logger: LoggerService) { }

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
      catchError((error: HttpErrorResponse) => {
        this.logger.handleError(error);
        this.notificationService.showError('Erro ao criar nova pessoa');
        return of(null);
      })
    ).subscribe({
      error: (error: any) => {
        console.error('Erro ao criar nova pessoa:', error);
      }
    });
  }

  update(peopleInfo: any) {
    const peopleId = this.idSelect;
    this.peopleController.update(peopleId, peopleInfo)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.logger.handleError(error);
          this.notificationService.showError('Erro ao atualizar pessoa');
          return of(null);
        })
      )
      .subscribe({
        error: (error: any) => {
          console.error('Erro ao atualizar pessoa:', error);
        }
      });
  }

  getAll(page: number, limit: number) {
    this.peopleController.getAll(page, limit)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.logger.handleError(error);
          this.notificationService.showError('Erro ao buscar pessoas');
          return of(null);
        })
      )
      .subscribe({
        next: (people: PeopleModel[] | null) => {
          if (people !== null) {
            this.peopleSubject.next(people);
          }
        },
        error: (error: any) => {
          console.error('Erro ao buscar pessoas:', error);
        }
      });
  }

  getById(id: number) {
    this.peopleController.getById(id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.logger.handleError(error);
          this.notificationService.showError('Erro ao buscar pessoa por ID');
          return of(null);
        })
      )
      .subscribe({
        error: (error: any) => {
          console.error('Erro ao buscar pessoa por ID:', error);
        }
      });
  }

  search(query: string | number, page: number, limit: number) {
    this.peopleController.search(query, page, limit)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.logger.handleError(error);
          this.notificationService.showError('Erro ao pesquisar pessoas');
          return of(null);
        })
      )
      .subscribe({
        next: (people: PeopleModel[] | null) => {
          if (people !== null) {
            this.peopleSubject.next(people);
          }
        },
        error: (error: any) => {
          console.error('Erro ao pesquisar pessoas:', error);
        }
      });
  }

  delete(id: number) {
    this.peopleController.delete(id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.logger.handleError(error);
          this.notificationService.showError('Erro ao deletar pessoa');
          return of(null);
        })
      )
      .subscribe({
        error: (error: any) => {
          console.error('Erro ao deletar pessoa:', error);
        }
      });
  }
}
