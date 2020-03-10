import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

///this Guard redirects to the main route, 
//when users want to go to pages such as login, register and landing

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
