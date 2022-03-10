import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpParams } from '@app/helpers/custom-http-params';
import { SignUp } from '@sign-up/models/sign-up';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userData: any;
  private differenceSecond!: number;
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private storageService: StorageService
  ) {}
  public async signIn(
    email: string,
    password: string,
    remember: boolean = false
  ): Promise<any> {
    this.userData = await this.http
      .post<any>(
        environment.urlAuth + environment.endpoints.login,
        {
          email,
          password,
        },
        {
          params: new CustomHttpParams('api-without-token'),
        }
      )
      .toPromise();
    if (remember) {
      this.storageService.setItem(
        'remember_data',
        JSON.stringify({ email, password })
      );
    }
    this.storageService.setItem('user', JSON.stringify(this.userData));
    const decodeToken = this.jwtHelperService.decodeToken(
      this.userData?.data.token
    );
    this.calcDifferenceTime(decodeToken.iat);
    return this.userData;
  }
  public async signUp(data: SignUp): Promise<any> {
    return this.http
      .post(environment.urlAuth + environment.endpoints.signup, data, {
        params: new CustomHttpParams('api-without-token'),
      })
      .toPromise();
  }
  private calcDifferenceTime(iat: number): void {
    const iatDate = iat * 1000;
    const actualDate = new Date().getTime();
    const difference = actualDate - iatDate;
    this.differenceSecond = difference;
    localStorage.setItem('differenceTime', this.differenceSecond.toString());
  }

  private getDifferenceSecond(): number {
    if (!this.differenceSecond) {
      this.differenceSecond = Number(localStorage.getItem('differenceTime'));
    }
    return this.differenceSecond;
  }
  public tokenExpired(token: string): boolean {
    const expiry =
      this.jwtHelperService.decodeToken(token).exp * 1000 +
      this.getDifferenceSecond();
    return new Date().getTime() >= expiry;
  }

  async calculateTimeExpiration(): Promise<any> {
    const exp =
      this.jwtHelperService.decodeToken(this.userData.access).exp * 1000;
    return exp + this.getDifferenceSecond() - new Date().getTime();
  }
  public resetuserData(): void {
    this.userData = null;
  }
  public async getCurrentAuthenticatedUser(): Promise<any> {
    this.resetuserData();
    try {
      this.userData = JSON.parse(await this.storageService.getItem('user'));
    } catch (error) {}
    return this.userData;
  }
  public async signOut(): Promise<any> {
    const userData = await this.getCurrentAuthenticatedUser();
    if (userData) {
      this.userData = null;
      localStorage.clear();
      this.storageService.removeAll();
    }
  }
}
