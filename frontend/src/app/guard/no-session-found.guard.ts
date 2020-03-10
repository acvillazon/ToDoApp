import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

///this Guard prevents that users without authentication could enter to a "private pages".
// pages that need authentication.

@Injectable({
  providedIn: 'root'
})
export class NoSessionFoundGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!localStorage.getItem("token")){
        this.router.navigateByUrl("/");
        return false;
      }else{
        return true;
      }
  }
  
}
