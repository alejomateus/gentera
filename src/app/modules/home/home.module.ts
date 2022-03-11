import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BadgeModule, ModalModule } from 'angular-bootstrap-md';
import { DishModalComponent } from './components/dish-modal/dish-modal.component';


@NgModule({
  declarations: [
    HomeComponent,
    DishModalComponent
  ],
  entryComponents: [ DishModalComponent ],
  imports: [
    CommonModule,
    ModalModule,
    BadgeModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
