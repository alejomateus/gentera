import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(private http: HttpClient) {}
  /**
   * Endpoint to get Ingredients
   */
  getIngredients(): Observable<any> {
    return this.http.get(
      environment.url + environment.endpoints.ingredients,
      {}
    );
  }
}
