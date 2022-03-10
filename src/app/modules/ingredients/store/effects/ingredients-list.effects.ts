import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { IngredientsService } from '../../services/ingredients.service';
import * as ingredientsListActions from '../actions/ingredients-list.actions';
/**
 * Injectable
 */
@Injectable()
/**
 * IngredientsListEffect
 */
export class IngredientsListEffect {
  ingredientsList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ingredientsListActions.ingredientsListLoad),
      switchMap(() =>
        this.ingredientsService.getIngredients().pipe(
          take(1),
          map((resp: any) =>
            ingredientsListActions.ingredientsListSave(
              resp.meals
            )
          ),
          catchError((error) =>
            of(ingredientsListActions.ingredientsListError({ error }))
          )
        )
      )
    )
  );

  /**
   * Constructor Ingredients Service
   * @param actions$ Action provider to set data en store
   * @param ingredientsService Service to get Data
   */
  constructor(
    private actions$: Actions,
    private ingredientsService: IngredientsService
  ) {}
}
