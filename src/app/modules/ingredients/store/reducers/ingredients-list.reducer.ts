import { createReducer, on } from "@ngrx/store";
import * as ingredientsList from "../actions/ingredients-list.actions";
import { initialStateIngredientsReducer } from "../state/ingredients.state";

export const ingredientsListReducer = createReducer(
  initialStateIngredientsReducer,
  on(ingredientsList.ingredientsListLoad, (state) => ({
    ...state,
    data: null,
    error: null,
    loaded: false,
    loading: true,
  })),
  on(ingredientsList.ingredientsListSave, (state, { ingredients }) => ({
    ...state,
    data: ingredients,
    error: null,
    loaded: true,
    loading: false,
  })),
  on(ingredientsList.ingredientsListError, (state, { error }) => ({
    ...state,
    data: null,
    error,
    loaded: false,
    loading: false,
  })),
  on(ingredientsList.ingredientsListReset, (state) => ({
    ...state,
    ...initialStateIngredientsReducer,
  })),
);
