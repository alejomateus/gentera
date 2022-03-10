import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as ingredientsActions from '../actions/ingredients-list.actions';
import { Observable } from 'rxjs';
import { IngredientsModuleState } from '../state/ingredients.state';
import { IIngredients } from '../../models/ingredients';
import { selectIngredients } from '../selectors/ingredients.selector';

@Injectable({
  providedIn: 'root',
})
export class IngredientsFacade {
  constructor(private store: Store<IngredientsModuleState>) {}
  // tslint:disable-next-line: member-ordering
  public selectIngredients$: Observable<IIngredients> = this.store.pipe(
    select(selectIngredients)
  );
  // tslint:disable-next-line: member-ordering
  public selectIngredients2$: Observable<IIngredients> = this.store.pipe(
    select(selectIngredients)
  );

  getIngredients(): void {
    this.store.dispatch(ingredientsActions.ingredientsListLoad());
  }
}
