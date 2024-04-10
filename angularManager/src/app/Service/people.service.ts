import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PeopleModel } from '../Model/people.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  
  private idSelected!: number;
  private baseUrl: string = `${environment.baseUrl}/people`;
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  get idSelect():number {
    return this.idSelected;
  }
  set idSelect(novoValor: number) {
    if (novoValor !== this.idSelected) {
      this.notificationService.idSelectedChanged.next(novoValor);
    }
    this.idSelected = novoValor;
  }

  getAll(page?: number, limit?: number): Observable<PeopleModel[]> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (limit !== undefined) {
      params = params.set('limit', limit.toString());
    }
    return this.http.get<PeopleModel[]>(this.baseUrl, { params });
  }
  search(query: string | number, page?: number, limit?: number): Observable<PeopleModel[]> {
    let params = new HttpParams().set('query', query.toString());
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (limit !== undefined) {
      params = params.set('limit', limit.toString());
    }
    return this.http.get<PeopleModel[]>(`${this.baseUrl}/search`, { params });
  }

  getById(id: number): Observable<PeopleModel> {
    return this.http.get<PeopleModel>(`${this.baseUrl}/${id}`);
  }

  post(people: PeopleModel): Observable<PeopleModel> {
    return this.http.post<PeopleModel>(this.baseUrl, people);
  }

  update(id: number, updatedPeople: PeopleModel): Observable<PeopleModel> {
    return this.http.patch<PeopleModel>(`${this.baseUrl}/${id}`, updatedPeople);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
