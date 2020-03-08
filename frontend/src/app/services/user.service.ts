import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = 'http://localhost:3000/api/'
  token:string;
  users:User[]=[];

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  getHeaders(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bear ${localStorage.getItem("token")}`
      })
    };
    return httpOptions;
  }

  getUsers(){
    return this.http.get(`${this.url}user/getAll`,this.getHeaders());
  }
}
