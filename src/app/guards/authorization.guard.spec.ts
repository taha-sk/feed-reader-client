import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DateTime } from 'luxon';
import { SearchBarComponent } from '../search-bar/search-bar.component';

import { AuthorizationGuard } from './authorization.guard';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path: '', component: SearchBarComponent}, {path: 'login', component: SearchBarComponent}]
        )
      ]
    });
    guard = TestBed.inject(AuthorizationGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not be authenticated', () => {
    localStorage.removeItem('token_exp_date');
    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toEqual(router.parseUrl('/login'));    
  });

  it('should not be admin', () => {
    const tokenExpDate = DateTime.now().plus(1000).toISO();
    localStorage.setItem('token_exp_date', tokenExpDate);
    localStorage.removeItem('admin');
    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toEqual(router.parseUrl('/'));    
  });

  it('should be admin', () => {
    const tokenExpDate = DateTime.now().plus(1000).toISO();
    localStorage.setItem('token_exp_date', tokenExpDate);
    localStorage.setItem('admin', "true");
    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toEqual(true);    
  });

});
