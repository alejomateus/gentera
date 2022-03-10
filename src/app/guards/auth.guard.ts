import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthenticationService } from "@shared/services/authentication.service";
import { from, Observable } from "rxjs";
/**
 * Injectable
 */
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor
   * @param router Router
   * @param authenticationService Autentication Service
   */
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  /**
   * Activate route
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return from(this.verifyToken());
  }
  /**
   * verify existing Token
   */
  async verifyToken(): Promise<any> {
    let value = false;
    let token = "";
    let userData: any;
    userData = await this.authenticationService.getCurrentAuthenticatedUser();
    if (userData) {
      token = userData.data.token;
    }
    if (
      token &&
      token !== "" &&
      !this.authenticationService.tokenExpired(token)
    ) {
      value = true;
    } else {
      // tslint:disable-next-line: no-console
      console.log("Token expirado");
      await this.authenticationService.signOut();
      await this.router.navigate(["/login"]);
    }
    return Promise.resolve(value);
  }
}
