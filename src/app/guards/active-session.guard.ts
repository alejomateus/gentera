import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "@shared/services/authentication.service";
import { from, Observable } from "rxjs";

/**
 * Injectable
 */
@Injectable({
  providedIn: "root",
})
export class ActiveSessionGuard implements CanActivate {
  /**
   * Constructor
   * @param router Router,
   * @param authenticationService AuthenticationService,
   */
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}
  /**
   * Method to validate route active
   */
  canActivate(): Observable<boolean> {
    return from(this.verifyToken());
  }
  /**
   * Verify Token existing with expiration
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
      !token ||
      token === "" ||
      this.authenticationService.tokenExpired(token)
    ) {
      value = true;
    } else {
      await this.router.navigate(["/dishes"]);
    }
    return Promise.resolve(value);
  }
}
