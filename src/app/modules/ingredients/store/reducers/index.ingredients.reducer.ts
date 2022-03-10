import { combineReducers } from "@ngrx/store";
import { ingredientsListReducer } from "./ingredients-list.reducer";
/**
 * Define Document Reducer to combine various reducers
 */
export const IngredientsReducer = combineReducers({
  ingredientsListReducer,
});
