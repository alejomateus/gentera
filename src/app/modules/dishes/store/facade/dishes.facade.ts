import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as dishesActions from '../actions/dishes-list.actions';
import { Observable } from 'rxjs';
import { DishesModuleState } from '../state/dishes.state';
import { IDishes } from '../../models/dishes';
import { selectDishes } from '../selectors/dishes.selector';

@Injectable({
  providedIn: 'root',
})
export class DishesFacade {
  constructor(private store: Store<DishesModuleState>) {}
  // tslint:disable-next-line: member-ordering
  public selectDishes$: Observable<IDishes> = this.store.pipe(
    select(selectDishes)
  );
  // tslint:disable-next-line: member-ordering
  public selectDishes2$: Observable<IDishes> = this.store.pipe(
    select(selectDishes)
  );

  getDishes(): void {
    this.store.dispatch(dishesActions.dishesListLoad());
  }
}
