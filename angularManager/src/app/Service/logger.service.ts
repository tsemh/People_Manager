import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  handleError(error: HttpErrorResponse) {
      let errorMessage = 'Erro desconhecido';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erro: ${error.error.message}`;
      } else {
        errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
        if (error.error && error.error.message) {
          errorMessage += `, mensagem do servidor: ${error.error.message}`;
        } else if (error.error && typeof error.error === 'string') {
          errorMessage += `, mensagem do servidor: ${error.error}`;
        } else if (error.error && typeof error.error === 'object') {
          errorMessage += `, detalhes do servidor: ${JSON.stringify(error.error)}`;
        }
      }
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
  }
}
