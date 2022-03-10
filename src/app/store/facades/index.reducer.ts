import { MetaReducer } from "@ngrx/store";
import { hydrationMetaReducer } from "./hydration.reducer";
import { clearStateMetaReducer } from "./reset.reducer";

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer,
  clearStateMetaReducer,
];
