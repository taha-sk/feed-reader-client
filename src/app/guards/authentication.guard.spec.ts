import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DateTime } from 'luxon';
import { SearchBarComponent } from '../search-bar/search-bar.component';

import { AuthenticationGuard } from './authentication.guard';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'login', component: SearchBarComponent}]
        )
      ]
    });
    guard = TestBed.inject(AuthenticationGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not be authenticated', () => {
    localStorage.removeItem('token_exp_date');
    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toEqual(router.parseUrl('/login'));    
  });

  it('should be authenticated', () => {
    const tokenExpDate = DateTime.now().plus(1000).toISO();
    localStorage.setItem('token_exp_date', tokenExpDate);
    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toEqual(true);    
  });

});
