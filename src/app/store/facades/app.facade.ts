import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { changeLanguaje, Languages, resetDataStore } from "../actions/app.actions";
import { IAppState } from "../reducers/index.app.reducer";
import { selectLanguage } from "../selectors/app.selector";

@Injectable()
export class AppFacade {
  public selectLanguage$: Observable<Languages> = this.store.pipe(
    select(selectLanguage),
  );

  constructor(private store: Store<IAppState>) { }
  changeLanguaje(language: Languages) {
    this.store.dispatch(changeLanguaje(language));
  }

  public resetDataStore() {
    this.store.dispatch(resetDataStore());
  }
}
