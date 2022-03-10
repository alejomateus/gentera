import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
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
  return new TranslateHttpLoader(http, 'assets/i18n/profile/', '.json');
}
@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
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
  ]
})
export class ProfileModule { }
