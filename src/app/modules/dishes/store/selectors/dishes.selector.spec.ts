import {
  DishesModuleState,
  initialStateDishesReducer,
} from '../state/dishes.state';
import { selectDishes } from './dishes.selector';

describe('AppSelector', () => {
  const dishesModuleState: DishesModuleState = {
    dishesListReducer: initialStateDishesReducer,
  };

  it('should return the selectDishes', () => {
    expect(selectDishes.projector(dishesModuleState)).toEqual(
      initialStateDishesReducer
    );
  });
});
