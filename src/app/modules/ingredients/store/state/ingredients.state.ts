
import { IIngredients } from "../../models/ingredients";

/**
 * Set a Name to read chart redux
 */
export const IngredientsFeatureName = "IngredientsState";


export type IngredientsModuleState = Readonly<{
  ingredientsListReducer: IIngredients;
}>;

export const initialStateIngredientsReducer: IIngredients = {
  data: null,
  error: null,
  loaded: null,
  loading: null,
};
