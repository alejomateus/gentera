import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ModalModule } from 'angular-bootstrap-md';
import { DishModalComponent } from './components/dish-modal/dish-modal.component';
import { ButtonsModule, WavesModule, CardsModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [HomeComponent, DishModalComponent],
  entryComponents: [DishModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    HomeRoutingModule,
    ButtonsModule,
    WavesModule,
    CardsModule,
  ],
})
export class HomeModule {}
