import { ActionReducerMap } from "@ngrx/store";
import { appReducer, ILanguage } from "./app.reducer";
export interface IAppState {
  language: ILanguage;
}

export const AppRootReducer: ActionReducerMap<IAppState> = {
  language: appReducer,
};
