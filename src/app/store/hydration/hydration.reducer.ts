import { stateHydrationReducer } from "@app/models/forms";
import { environment } from "@environment";
import { ActionReducer, INIT } from "@ngrx/store";
import * as CryptoJS from "crypto-js";

import {
  LanguageFeatureName,
} from "../state/app.state";
// tslint:disable-next-line: jsdoc-format
/** reducers to persist **/
const config: string[] = [
  LanguageFeatureName
];

export const hydrationMetaReducer = (
  reducer: ActionReducer<any>,
): ActionReducer<any> => {
  return (state, action) => {
    const nextState = reducer(state, action);
    let values: stateHydrationReducer = {
      language: ""
    };
    let exist = false;
    // tslint:disable-next-line: forin
    for (let key in sessionStorage) {
      if (
        key.includes("state-") === true &&
        sessionStorage.getItem(key) !== null
      ) {
        const value = sessionStorage.getItem(key);
        const string = key.slice(6) ? key.slice(6) : "";
        values[string as keyof stateHydrationReducer] = JSON.parse(
          CryptoJS.AES.decrypt(value === null ? "" : value, environment.ordersKey.trim(),
          ).toString(CryptoJS.enc.Utf8),
        );
        exist = true;
      }
    }

    if (action.type === INIT) {
      if (exist) {
        try {
          return { ...nextState, ...values };
        } catch {
          sessionStorage.removeItem("state");
          for (const key in sessionStorage) {
            if (
              key.includes("state-") &&
              sessionStorage.getItem(key) !== null
            ) {
              sessionStorage.removeItem(key);
            }
          }
        }
      }
    }
    config.forEach((value) => {
      if (value in nextState) {
        const valor = JSON.stringify(nextState[value]);
        const encrypt = CryptoJS.AES.encrypt(
          valor,
          environment.ordersKey.trim(),
        ).toString();
        sessionStorage.setItem("state-" + value, encrypt);
      }
    });
    return nextState;
  };
};
