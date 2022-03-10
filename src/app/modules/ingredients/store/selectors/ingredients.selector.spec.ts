import { IngredientsModuleState, initialStateIngredientsReducer } from "../state/ingredients.state";
import { selectIngredients } from "./ingredients.selector";


describe("AppSelector", () => {

  const ingredientsModuleState: IngredientsModuleState = {
    ingredientsListReducer: initialStateIngredientsReducer,
  };

  it("should return the selectIngredients", () => {
    expect(selectIngredients.projector(ingredientsModuleState)).toEqual(
      initialStateIngredientsReducer,
    );
  });

});
