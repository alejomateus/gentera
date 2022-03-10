import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  DishesFeatureName,
  DishesModuleState,
} from "../state/dishes.state";

export const DishesRootSelector = createFeatureSelector<
  DishesModuleState
>(DishesFeatureName);

export const selectDishes = createSelector(
  DishesRootSelector,
  (state: DishesModuleState) => state.dishesListReducer,
);


