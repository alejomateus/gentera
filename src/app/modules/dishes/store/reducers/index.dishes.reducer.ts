import { combineReducers } from "@ngrx/store";
import { dishesListReducer } from "./dishes-list.reducer";
/**
 * Define DishesReducer to combine various reducers
 */
export const DishesReducer = combineReducers({
  dishesListReducer,
});
