import { createReducer, on } from "@ngrx/store";
import * as appActions from "../actions/app.actions";
import { initialState } from "../state/app.state";

export interface ILanguage {
  language: appActions.Languages;
}

export const appReducer = createReducer(
  initialState,
  on(appActions.changeLanguaje, (state, { language }) => ({
    ...state,
    language,
  })),
);
