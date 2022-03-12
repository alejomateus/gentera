import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  constructor(private http: HttpClient) {}
  /**
   * Endpoint to get Dishes
   */
  getDishes(): Observable<any> {
    return this.http.get(environment.url + environment.endpoints.dishes);
  }
  getDishbyId(id: number): Observable<any> {
    return this.http.get(environment.url + environment.endpoints.dish + id);
  }
  getRandomDish(): Observable<any> {
    return this.http.get(environment.url + environment.endpoints.random);
  }
}
