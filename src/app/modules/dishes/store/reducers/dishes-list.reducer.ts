import { createReducer, on } from '@ngrx/store';
import * as dishesList from '../actions/dishes-list.actions';
import { initialStateDishesReducer } from '../state/dishes.state';

export const dishesListReducer = createReducer(
  initialStateDishesReducer,
  on(dishesList.dishesListLoad, (state) => ({
    ...state,
    data: null,
    error: null,
    loaded: false,
    loading: true,
  })),
  on(dishesList.dishesListSave, (state, { dishes }) => ({
    ...state,
    data: dishes,
    error: null,
    loaded: true,
    loading: false,
  })),
  on(dishesList.dishesListError, (state, { error }) => ({
    ...state,
    data: null,
    error,
    loaded: false,
    loading: false,
  })),
  on(dishesList.dishesListReset, (state) => ({
    ...state,
    ...initialStateDishesReducer,
  }))
);
