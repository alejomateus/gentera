import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppFacade } from '@store/facades/app.facade';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';
/**
 * Injectable
 */
@Injectable({
  providedIn: 'root',
})
export class CommonsService {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private appFacade: AppFacade
  ) {}

  /**
   * Logout Method
   */
  async logOut(flag = true, callService = true): Promise<any> {
    if (callService) {
      await this.authenticationService.signOut();
    }
    localStorage.clear();
    await this.storageService.removeAll();
    this.appFacade.resetDataStore();
    if (flag) {
      this.router.navigate(['login']);
    }
  }
  /**
   * Navigate to url
   * @param url
   */
  async navigate(url: string): Promise<any> {
    await this.router.navigate([url]);
  }

  async navigateWithParams(url: string, queryParams: object): Promise<any> {
    await this.router.navigate([url], { queryParams });
  }

  /**
   * Redirect to principal dashboard administration
   */
  redirectToHome(): void {
    this.router.navigate(['/dishes']);
  }

  async verifyToken(): Promise<any> {
    let value = false;
    let token = '';
    let userData: any;
    userData = await this.authenticationService.getCurrentAuthenticatedUser();
    if (userData) {
      token = userData.data.token;
    }
    if (
      !token ||
      token === '' ||
      this.authenticationService.tokenExpired(token)
    ) {
      value = true;
    }
    return Promise.resolve(value);
  }
}
