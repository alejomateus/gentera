import { TestBed } from '@angular/core/testing';

import { AuthenticationInterceptorService } from './authentication-interceptor.service';

describe('AuthenticationInterceptorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthenticationInterceptorService],
    })
  );

  it('should be created', () => {
    const interceptor: AuthenticationInterceptorService = TestBed.inject(
      AuthenticationInterceptorService
    );
    expect(interceptor).toBeTruthy();
  });
});
