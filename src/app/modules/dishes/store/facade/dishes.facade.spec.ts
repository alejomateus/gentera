import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import * as dishesActions from "../actions/dishes-list.actions"
import { DishesFacade } from "./dishes.facade";

describe("DishesFacade", () => {
  let service: DishesFacade;
  let store: MockStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DishesFacade, provideMockStore()],
    }).compileComponents();
    service = TestBed.inject(DishesFacade);
    store = TestBed.inject(MockStore);
  });
  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("should dishesListLoad() is called", () => {
    const action = dishesActions.dishesListLoad();
    const stores = TestBed.inject(Store);
    const spy = spyOn(stores, "dispatch");
    service.getDishes();
    expect(spy).toHaveBeenCalledWith(action);
  });

});
