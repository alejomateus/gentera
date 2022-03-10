import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AppFacade } from "@store/facades/app.facade";
import {
  initialState,
  routerSpy,
  spyHelperService,
} from "@app/test-helpers/models/general.model.mock";
import { JwtHelperService } from "@auth0/angular-jwt";
import { provideMockStore } from "@ngrx/store/testing";
import { AuthenticationService } from "./authentication.service";
import { CommonsService } from "./commons.service";
import { StorageService } from "./storage.service";

describe("CommonsService", () => {
  let service: CommonsService;
  let httpClientSpy;
  let authenticationService: AuthenticationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState }),
        StorageService,
        AuthenticationService,
        StorageService,
        { provide: Router, useValue: routerSpy },
        AppFacade,
        { provide: JwtHelperService, useValue: spyHelperService },
      ],
    });
    service = TestBed.inject(CommonsService);
    httpClientSpy = TestBed.inject(HttpClient);
    authenticationService = TestBed.inject(AuthenticationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should be logOut", async () => {
    spyOn(authenticationService, "signOut").and.returnValue(
      Promise.resolve(true),
    );
    await service.logOut();
    expect(service).toBeTruthy();
  });
  it("should be logOut", async () => {
    await service.logOut(true, false);
    expect(service).toBeTruthy();
  });

  it("should be logOut", async () => {
    spyOn(authenticationService, "signOut").and.returnValue(
      Promise.resolve(true),
    );
    await service.logOut(false);
    expect(service).toBeTruthy();
  });

  it("should redirectToHome() is called", () => {
    service.redirectToHome();
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/home"]);
  });

  it("should be navigate", () => {
    service.navigate("/signup/initial");
    expect(service).toBeTruthy();
  });
});
