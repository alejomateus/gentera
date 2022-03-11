import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginRootRoute } from '@login/login-routing.module';
import { homeRootRoute } from '@home/home-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { ActiveSessionGuard } from './guards/active-session.guard';
import { signupRootRoute } from '@sign-up/sign-up-routing.module';
import { profileRootRoute } from '@profile/profile-routing.module';
import { ingredientsRootRoute } from '@ingredients/ingredients-routing.module';
import { dishesRootRoute } from '@dishes/dishes-routing.module';
import { dishRootRoute } from '@dish/dish-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: loginRootRoute,
    pathMatch: 'full',
  },
  {
    path: loginRootRoute,
    loadChildren: () =>
      import('@login/login.module').then((m) => m.LoginModule),
    canActivate: [ActiveSessionGuard],
  },
  {
    path: homeRootRoute,
    loadChildren: () => import('@home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: signupRootRoute,
    loadChildren: () =>
      import('@sign-up/sign-up.module').then((m) => m.SignUpModule),
    canActivate: [ActiveSessionGuard],
  },
  {
    path: profileRootRoute,
    loadChildren: () =>
      import('@profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: ingredientsRootRoute,
    loadChildren: () =>
      import('@ingredients/ingredients.module').then(
        (m) => m.IngredientsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: dishesRootRoute,
    loadChildren: () =>
      import('@dishes/dishes.module').then((m) => m.DishesModule),
    canActivate: [AuthGuard],
  },
  {
    path: dishRootRoute,
    loadChildren: () =>
      import('@dish/dish.module').then((m) => m.DishModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
