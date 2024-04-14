import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, catchError } from "rxjs";
import { Injectable } from "@angular/core";
import { PeopleModel } from "../Model/people.model";
import { LoggerService } from "../Service/logger.service";

@Injectable({
  providedIn: 'root'
})
export class PeopleController {
  
  private baseUrl: string = `${environment.baseUrl}/people`;
  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  getAll(page?: number, limit?: number): Observable<PeopleModel[]> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (limit !== undefined) {
      params = params.set('limit', limit.toString());
    }
    return this.http.get<PeopleModel[]>(this.baseUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => this.logger.handleError(error))
    );
  }

  search(query: string | number, page?: number, limit?: number): Observable<PeopleModel[]> {
    let params = new HttpParams().set('query', query.toString());
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (limit !== undefined) {
      params = params.set('limit', limit.toString());
    }
    return this.http.get<PeopleModel[]>(`${this.baseUrl}/search`, { params }).pipe(
      catchError((error: HttpErrorResponse) => this.logger.handleError(error))
    );
  }

  getById(id: number): Observable<PeopleModel> {
    return this.http.get<PeopleModel>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => this.logger.handleError(error))
    );
  }

  post(people: PeopleModel): Observable<PeopleModel> {
    return this.http.post<PeopleModel>(this.baseUrl, people).pipe(
      catchError((error: HttpErrorResponse) => this.logger.handleError(error))
    );
  }

  update(id: number, updatedPeople: PeopleModel): Observable<PeopleModel> {
    return this.http.patch<PeopleModel>(`${this.baseUrl}/${id}`, updatedPeople).pipe(
      catchError((error: HttpErrorResponse) => this.logger.handleError(error))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => this.logger.handleError(error))
    );
  }

}