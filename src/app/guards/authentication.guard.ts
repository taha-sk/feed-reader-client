import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DateTime } from "luxon";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard  {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const tokenExpDate = localStorage.getItem("token_exp_date");

    if (tokenExpDate) {
      const expDate = DateTime.fromISO(tokenExpDate);
      if(DateTime.now() < expDate){
        return true; 
      }else{
        //Logout
        localStorage.clear();
      }
    }

    return this.router.parseUrl('/login');
  }
  
}
