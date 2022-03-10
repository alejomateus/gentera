import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { changeLanguaje } from "@store/actions/app.actions";

import { AppFacade } from "./app.facade";

describe("AppFacade", () => {
  let service: AppFacade;
  let store: MockStore;
  const language = "en";
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppFacade, provideMockStore()],
    }).compileComponents();
    service = TestBed.inject(AppFacade);
    store = TestBed.inject(MockStore);
  });
  it("should dispatch action changeLanguaje", () => {
    const action = changeLanguaje("en");
    const stores = TestBed.inject(Store);
    const spy = spyOn(stores, "dispatch");
    service.changeLanguaje(language);
    expect(spy).toHaveBeenCalledWith(action);
  });
});
