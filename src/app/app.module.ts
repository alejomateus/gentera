import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '@environment';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NGFORAGE_CONFIG_PROVIDER } from './ngforage.config';
import { AppFacade } from '@store/facades/app.facade';
import { AppRootReducer, IAppState } from '@store/reducers/index.app.reducer';
import { metaReducers } from '@store/hydration/index.reducer';
import { CoreModule } from '@core/core.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ThemeModule } from '@theme/theme.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const AppRootReducerToken = new InjectionToken<
  ActionReducerMap<IAppState>
>('Feature App Component');

export function tokenGetter() {
  return null;
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ThemeModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    HttpClientModule,
    StoreModule.forRoot(AppRootReducerToken, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 50,
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
      },
      isolate: true,
    }),
  ],
  providers: [
    {
      provide: AppRootReducerToken,
      useValue: AppRootReducer,
    },
    NGFORAGE_CONFIG_PROVIDER,
    AppFacade,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
