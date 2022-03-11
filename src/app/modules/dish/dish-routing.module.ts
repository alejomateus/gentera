import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishComponent } from './dish.component';

export const dishRootRoute = 'dish/:id';

const routes: Routes = [{ path: '', component: DishComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DishRoutingModule {}
