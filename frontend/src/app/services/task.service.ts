import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url:string = 'http://localhost:3000/api/'
  token:string;

  taskGroupedByList:Map<string,Array<Object>>=new Map();
  taskWithoutGroupBy:any[];

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

  updateDataLocally(resp){
    this.taskWithoutGroupBy=resp['task'];
    this.taskGroupedByList=new Map(resp['taskMod'])
  }

  getTasks(id_:any){
    return this.http.get(`${this.url}task/getAll/${id_}`,this.getHeaders())
    .pipe(map(response =>{
        this.updateDataLocally(response);
        return response;
      })
    );
  }

  createTask(task:any,dash:string){
    return this.http.post(`${this.url}task/new`,{Task:task,dashboard:dash},this.getHeaders())
      .pipe(map(response =>{
        this.updateDataLocally(response);
        return response;
      })
    );
  }
  
  updateTaskAll(task:any,dash:string){
    return this.http.put(`${this.url}task/updateAll`,{Task:task,dashboard:dash},this.getHeaders())
      .pipe(map(response =>{
        this.updateDataLocally(response);
        return response;
      })
    );
  }

  addMembetToTask(task:any,idTask:any,dash:string){
    return this.http.put(`${this.url}task/addMember`,{Task:task,idTask,dashboard:dash},this.getHeaders())
    .pipe(map(response =>{
      this.updateDataLocally(response);
      return response;
      })
    );
  }

  removeMembetToTask(User:any,idTask:string,dash:string){
    return this.http.put(`${this.url}task/removeMember`,{User,idTask,dashboard:dash},this.getHeaders())
      .pipe(map(response =>{
        this.updateDataLocally(response);
        return response;
      })
    );
  }
}
