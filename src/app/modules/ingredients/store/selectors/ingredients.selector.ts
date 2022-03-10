import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  IngredientsFeatureName,
  IngredientsModuleState,
} from "../state/ingredients.state";

export const IngredientsRootSelector = createFeatureSelector<
  IngredientsModuleState
>(IngredientsFeatureName);

export const selectIngredients = createSelector(
  IngredientsRootSelector,
  (state: IngredientsModuleState) => state.ingredientsListReducer,
);


