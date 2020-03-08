import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

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
