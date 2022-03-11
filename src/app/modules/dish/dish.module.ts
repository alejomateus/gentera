import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishRoutingModule } from './dish-routing.module';
import { DishComponent } from './dish.component';
import { BadgeModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    DishComponent
  ],
  imports: [
    CommonModule,
    BadgeModule,
    DishRoutingModule
  ]
})
export class DishModule { }
