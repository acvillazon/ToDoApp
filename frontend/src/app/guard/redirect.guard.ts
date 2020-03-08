import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private router:Router){
}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    
    if(localStorage.getItem("token")){
      this.router.navigateByUrl("/toDo");
      return false;
    }else{
      return true;
    }
  }
  
}
