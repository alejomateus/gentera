import { createAction } from '@ngrx/store';
import { IDish } from '../../models/dishes';

export const enum TypeActionsDisheslist {
  dishesListLoadString = '[DISHES LIST] Loading data',
  dishesListSaveString = '[DISHES LIST] Successful data loaded',
  dishesListErrorString = '[DISHES LIST] Save error response',
  dishesListResetString = '[DISHES LIST] Reset data',
}

export const dishesListLoad = createAction(
  TypeActionsDisheslist.dishesListLoadString
);

export const dishesListSave = createAction(
  TypeActionsDisheslist.dishesListSaveString,
  (dishes: IDish[]) => ({ dishes })
);

export const dishesListError = createAction(
  TypeActionsDisheslist.dishesListErrorString,
  (error: any) => ({ error })
);

export const dishesListReset = createAction(
  TypeActionsDisheslist.dishesListResetString
);
