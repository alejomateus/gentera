import { createAction } from '@ngrx/store';
import { IIngredient } from '../../models/ingredients';

export const enum TypeActionsIngredientslist {
  ingredientsListLoadString = '[INGREDIENTS LIST] Loading data',
  ingredientsListSaveString = '[INGREDIENTS LIST] Successful data loaded',
  ingredientsListErrorString = '[INGREDIENTS LIST] Save error response',
  ingredientsListResettring = '[INGREDIENTS LIST] Reset data',
}

export const ingredientsListLoad = createAction(
  TypeActionsIngredientslist.ingredientsListLoadString
);

export const ingredientsListSave = createAction(
  TypeActionsIngredientslist.ingredientsListSaveString,
  (ingredients: IIngredient[]) => ({ ingredients })
);

export const ingredientsListError = createAction(
  TypeActionsIngredientslist.ingredientsListErrorString,
  (error: any) => ({ error })
);

export const ingredientsListReset = createAction(
  TypeActionsIngredientslist.ingredientsListResettring
);
