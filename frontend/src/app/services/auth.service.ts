import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = 'http://localhost:3000/api/'
  token:string;

  constructor(
    private http:HttpClient,
    private router:Router
  ) { 
    this.loadToken();
  }

  login(user:User){
    return this.http.post(`${this.url}auth/login`,user)
      .pipe(map( data =>{
        this.saveToken(data['idToken']);
        return data;
    }));
  }

  register(user:User){
    return this.http.post(`${this.url}auth/register`,user)
      .pipe(map( data =>{
        this.saveToken(data['idToken']);
        return data;
    }));
  }

  logout(){
    localStorage.removeItem("token");
    this.token=null;
    this.router.navigate(['']);
  }

  //Save token in LocalStorage
  saveToken(token:string){
    localStorage.setItem("token", token);
    this.token = token;
  }

  //Load the token, if it's exists in localStorage.
  loadToken(){
    if(localStorage.getItem("token")){
      this.token = localStorage.getItem("token");
    }else{
      this.token = null;
    }
  }
}
