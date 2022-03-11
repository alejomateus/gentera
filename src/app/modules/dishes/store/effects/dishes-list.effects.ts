import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { DishesService } from '../../../../services/dishes.service';
import * as dishesListActions from '../actions/dishes-list.actions';
/**
 * Injectable
 */
@Injectable()
/**
 * DishesListEffect
 */
export class DishesListEffect {
  dishesList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(dishesListActions.dishesListLoad),
      switchMap(() =>
        this.dishesService.getDishes().pipe(
          take(1),
          map((resp: any) =>
            dishesListActions.dishesListSave(
              resp.meals
            )
          ),
          catchError((error) =>
            of(dishesListActions.dishesListError({ error }))
          )
        )
      )
    )
  );

  /**
   * Constructor Dishes Service
   * @param actions$ Action provider to set data en store
   * @param dishesService Service to get Data
   */
  constructor(
    private actions$: Actions,
    private dishesService: DishesService
  ) {}
}
