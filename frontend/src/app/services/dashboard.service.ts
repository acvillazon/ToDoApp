import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';
import { DashBoard } from '../models/dashboard.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url:string = 'http://localhost:3000/api/'
  token:string;

  dashboards:DashBoard[];
  MyDashs:DashBoard[];
  listsInDash:any[];

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

  getDashboard(_id:string){
    return this.http.get(`${this.url}dashboard/getDash/${_id}`,this.getHeaders());
  }

  getDashboards(){
    return this.http.get(`${this.url}dashboard/getAll`,this.getHeaders())
      .pipe(map(res =>{
          this.dashboards=res['dashboards'];
          return res;
      }));
  }

  getMyDash(){
    return this.http.get(`${this.url}dashboard/getInUser`,this.getHeaders())
      .pipe(map(res =>{
        this.MyDashs=res['dashboards'];
        return res;
      }));
  }

  getList(id_:any){
    return this.http.get(`${this.url}list/getAll/${id_}`,this.getHeaders())
      .pipe(map(res =>{
        this.listsInDash=res["tasks"];
        return res;
      }));
  }

  createDashboard(dash:DashBoard){
    return this.http.post(`${this.url}dashboard/new`,dash,this.getHeaders());
  }

  addMemberToDash(idUser:string,idDash:string){
    return this.http.put(`${this.url}dashboard/addMember`,{idUser,idDash},this.getHeaders());
  }

  removeMemberToDash(idUser:string,idDash:string){
    return this.http.put(`${this.url}dashboard/removeMember`,{idUser,idDash},this.getHeaders());
  }

  createList(list:any){
    return this.http.post(`${this.url}list/new`,list,this.getHeaders())
      .pipe(map(data =>{
        this.listsInDash.push(data["List"]);
        return data;
    }));
  }
}
