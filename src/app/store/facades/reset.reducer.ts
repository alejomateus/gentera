import { Action, ActionReducer } from "@ngrx/store";
import { TypeActionsApp } from "../actions/app.actions";

export function clearStateMetaReducer<State extends {}>(
  reducer: ActionReducer<State>,
): ActionReducer<State> {
  return function clearStateFn(state: State, action: Action) {
    if (action.type === TypeActionsApp.resetString) {
      state = ({} as any) as State;
      sessionStorage.clear();
    }
    return reducer(state, action);
  };
}
