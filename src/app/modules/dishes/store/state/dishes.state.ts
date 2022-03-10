
import { IDishes } from "../../models/dishes";

/**
 * Set a Name to read chart redux
 */
export const DishesFeatureName = "DishesState";


export type DishesModuleState = Readonly<{
  dishesListReducer: IDishes;
}>;

export const initialStateDishesReducer: IDishes = {
  data: null,
  error: null,
  loaded: null,
  loading: null,
};
