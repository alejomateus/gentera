import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishesRoutingModule } from './dishes-routing.module';
import { DishesComponent } from './dishes.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  DishesFeatureName,
  DishesModuleState,
} from './store/state/dishes.state';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { DishesListEffect } from './store/effects/dishes-list.effects';
import { EffectsModule } from '@ngrx/effects';
import { DishesService } from '../../services/dishes.service';
import { DishesFacade } from './store/facade/dishes.facade';
import { DishesReducer } from './store/reducers/index.dishes.reducer';
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { ButtonsModule, WavesModule, CardsModule } from 'angular-bootstrap-md';

export function childLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/dishes/', '.json');
}

export const DishesRootReducerToken = new InjectionToken<
  ActionReducerMap<DishesModuleState>
>('Feature dishes Reducer');

@NgModule({
  declarations: [DishesComponent, DishCardComponent],
  imports: [
    CommonModule,
    DishesRoutingModule,
    ButtonsModule,
    WavesModule,
    CardsModule,
    EffectsModule.forFeature([DishesListEffect]),
    StoreModule.forFeature(DishesFeatureName, DishesRootReducerToken),
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
    DishesService,
    DishesFacade,
    {
      provide: DishesRootReducerToken,
      useValue: DishesReducer,
    },
  ],
})
export class DishesModule {}
