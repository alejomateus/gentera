import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import * as ingredientsActions from "../actions/ingredients-list.actions"
import { IngredientsFacade } from "./ingredients.facade";

describe("IngredientsFacade", () => {
  let service: IngredientsFacade;
  let store: MockStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientsFacade, provideMockStore()],
    }).compileComponents();
    service = TestBed.inject(IngredientsFacade);
    store = TestBed.inject(MockStore);
  });
  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("should getIngredients() is called", () => {
    const action = ingredientsActions.ingredientsListLoad();
    const stores = TestBed.inject(Store);
    const spy = spyOn(stores, "dispatch");
    service.getIngredients();
    expect(spy).toHaveBeenCalledWith(action);
  });

});
