import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ILanguage } from "../reducers/app.reducer";
import { LanguageFeatureName } from "../state/app.state";

export const LanguajeRootSelector = createFeatureSelector<ILanguage>(
  LanguageFeatureName,
);

export const selectLanguage = createSelector(
  LanguajeRootSelector,
  (state: ILanguage) => state.language,
);
