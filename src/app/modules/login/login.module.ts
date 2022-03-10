import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  WavesModule,
  ButtonsModule,
  CheckboxModule,
  InputsModule,
  IconsModule,
  CardsModule,
  InputUtilitiesModule,
} from 'angular-bootstrap-md';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function childLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/login/', '.json');
}
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    InputUtilitiesModule,
    ButtonsModule,
    WavesModule,
    InputsModule,
    CardsModule,
    CheckboxModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: childLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
})
export class LoginModule {}
