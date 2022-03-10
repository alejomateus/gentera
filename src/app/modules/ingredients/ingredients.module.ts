import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsComponent } from './ingredients.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  IngredientsFeatureName,
  IngredientsModuleState,
} from './store/state/ingredients.state';
import { IngredientsListEffect } from './store/effects/ingredients-list.effects';
import { IngredientsService } from './services/ingredients.service';
import { IngredientsFacade } from './store/facade/ingredients.facade';
import { IngredientsReducer } from './store/reducers/index.ingredients.reducer';
import { ButtonsModule, WavesModule, CardsModule } from 'angular-bootstrap-md';
import { IngredientCardComponent } from './components/ingredient-card/ingredient-card.component';

export function childLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/ingredients/', '.json');
}
export const IngredientsRootReducerToken = new InjectionToken<
  ActionReducerMap<IngredientsModuleState>
>('Feature ingredients Reducer');

@NgModule({
  declarations: [IngredientsComponent, IngredientCardComponent],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    ButtonsModule,
    WavesModule,
    CardsModule,
    EffectsModule.forFeature([IngredientsListEffect]),
    StoreModule.forFeature(IngredientsFeatureName, IngredientsRootReducerToken),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: childLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  providers: [
    IngredientsService,
    IngredientsFacade,
    {
      provide: IngredientsRootReducerToken,
      useValue: IngredientsReducer,
    },
  ],
})
export class IngredientsModule {}
