import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from '../../services/dashboard.service';
import { DashBoard } from '../../models/dashboard.model';
import Swal from "sweetalert2";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { TaskService } from '../../services/task.service';
import { PopUpService } from '../../services/pop-up.service';


@Component({
  selector: 'app-list-of',
  templateUrl: './list-of.component.html',
  styleUrls: ['./list-of.component.css']
})
export class ListOfComponent implements OnInit {
  taskSelected:any;
  forEdit:boolean=false;
  id_:string;
  dash:DashBoard;
  nameList:string;

  taskForSearch:any[]=[];
  userJSON:any={};
  status:string[]=["Open","In-Progress","Completed"];
  colorsStatus:string[]=["#def3fd","#d5f7c4","#fddfdf"];

  constructor(private path:ActivatedRoute,
              public dashService:DashboardService,
              public userService:UserService,
              public taskService:TaskService,
              private popUp:PopUpService,
    ) { 
    this.id_=this.path.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getUsers();
    this.getInfoDash();
    this.getLists();

  }
  
  getUsers(){
    this.userService.getUsers().subscribe((data:User[])=>{ 
      this.userService.users=data['Users']; 
    },err =>{
      this.popUp.simpleMessage("Internal error getting users","error",2000);
    });
  };

  getInfoDash(){
    this.dashService.getDashboard(this.id_).subscribe(data=>{
      this.dash=data['dashboard'];
    },err=>{
      this.popUp.simpleMessage("Internal error getting dashboards","error",2000);
    });
  }

  async addUserToBoard(){
    let input = {};
    this.userService.users.map(data =>{
      input[data['_id']]=data.username;
    });

    let user = await this.popUp.inputSelect(
      input,"Add new member","Name");

    if (user) {
      let toSend = this.dash.members.filter(data => data['_id'] == user);

      if(toSend.length>0){
        return this.popUp.simpleMessage(
          "The user already belongs to the dashboard.",'error',1500);
      }

      this.dashService.addMemberToDash(user,this.id_).subscribe(data =>{
        this.dash=data['dashboardUpdated'];
      },err=>{
        this.popUp.simpleMessage(
          "Internal error adding new member",'error',1500);
      });
    }
  }

  async createList(){
    let response = await this.popUp.inputText("Name of list", true, "create");
    if(response['result'].dismiss){return;}
    if(response['result'].value=='' && !response["textInput"]){
      return this.popUp.simpleMessage("it's necessary to set a name","error", 1500);
    }

    this.popUp.simpleMessage("Wait a minute...", "info", 1500);
    Swal.showLoading();
    this.sendDataList(response['result']);
  }

  sendDataList(tittle){
    this.dashService.createList({tittle:tittle.value, dashboard:this.dash})
      .subscribe(response =>{
        Swal.close();

        this.dashService.listsInDash.map(data =>{
          !this.taskService.taskGroupedByList.get(data._id) 
          ?this.taskService.taskGroupedByList.set(data._id, []) 
          : null;
        });
    }, err =>{
      this.popUp.simpleMessage("Internal error creating list","error",2000);
    });
  }

  removeList(id,i){
    this.popUp.simpleMessage("Wait a minute","info",1500);
    
    this.dashService.listsInDash.splice(i,1);
    this.taskService.taskGroupedByList.delete(id);

    this.dashService.removeList(id).subscribe(data=>{
      Swal.close()
      this.popUp.simpleMessage("The list was elimitaed","success",2000);
    },err=>{
      Swal.close()
      this.popUp.simpleMessage("Error removing the list","error",2000);
    });
  }

  getLists(){
    this.dashService.getList(this.id_).subscribe((data:any) =>{
      this.getTasksOfDash();
    },err=>{
      this.popUp.simpleMessage("Internal error getting lists","error",2000);
    });
  }

  createTask(item:string,idList:string){
    this.popUp.simpleMessage("Wait a minute...","info",5000);
    if(item.length){
      const newTask={ tittle:item, list:idList, dashboard:this.id_};
  
      this.taskService.createTask(newTask,this.id_).subscribe(data =>{
        Swal.close();
      },err=>{
        Swal.close();
        this.popUp.simpleMessage("Internal error creating task","error",2000);
      });
    }
  }

  filterTaskForSearch(task:any){
    this.taskForSearch = this.taskService.taskWithoutGroupBy.filter(data =>{
      return data.tittle.toLowerCase().includes(task.toLowerCase()) ;
    });
  }
  getTasksOfDash(callback?: (n: number) => any):void{
    this.taskService.getTasks(this.id_).subscribe(data =>{
      this.taskForSearch=data["task"];

      this.dashService.listsInDash.map(data =>{
        !this.taskService.taskGroupedByList.get(data._id) 
        ?this.taskService.taskGroupedByList.set(data._id, []) 
        : null;
      });

      if(callback!=undefined){
       callback(0);
      }
    });
  }

  ////FUNCTION FOR DRAG & DROP THE ELEMENTS.
  drop(event: CdkDragDrop<string[]>,idList) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      
      //we take the task which was moved and modified its list_id.
      let taskMoved = event.container.data[event.currentIndex];
      taskMoved['list']=idList;
      this.updateTask(taskMoved);
    }
  }

  updateTaskAll(task:any,drawer:any){
    this.taskService.updateTaskAll(task,this.id_).subscribe(response =>{
      drawer.toggle();
      this.popUp.simpleMessage("Task updated","success",2000);
    },err =>{
      this.popUp.simpleMessage("Internal error updating task","error",2000);
    });
    Swal.showLoading();
  }

  updateTask(task:any){
    this.taskService.updateTaskAll(task,this.id_).subscribe(response =>{
      this.popUp.simpleMessage("Task updated","success",2000);
    },err =>{
      this.popUp.simpleMessage("Internal error updating task","error",2000);
    });
    Swal.showLoading();
  }

  async addNewMemberToTask(){
    let input = {};
    this.userJSON = {};
    this.dash.members.map(data =>{
      this.userJSON[data['_id']]=data
      input[data['_id']]=data['username'];
    })

    let task = await this.popUp.inputSelect(input,'Add new member to task','Select a user');
    
    if (task) {
      let toSend = this.taskSelected.assignedTo.filter((data,i) => data['_id'] == task);

      if(toSend.length>0){
        return this.popUp.simpleMessage("The user already belongs to the board","error",1500);
      }

      this.taskService.addMembetToTask(task,this.taskSelected._id,this.id_).subscribe(data =>{
        this.taskSelected.assignedTo.push(this.userJSON[task]);
      },err=>{
        this.popUp.simpleMessage(
          "Internal error adding new member","error",2000);
      });
    }
  }

  removeMemberOfDash(user:any){
    Swal.showLoading();
    this.dashService.removeMemberToDash(user._id, this.id_).subscribe(data =>{
      if(data['status']){
        return this.popUp.simpleMessage(
            "You cannot delete the owner of the dashboard","error",2000);
      }
      
      this.dash=data['dashboardUpdated'];
      Swal.close();
    },err=>{
      Swal.close();
      this.popUp.simpleMessage("Internal error deleting a member",'error',1500);
    });
  }

  removeMemberOfTask(user:any){
    this.taskService.removeMembetToTask(user,this.taskSelected._id,this.id_).subscribe(data=>{
      this.taskSelected = this.taskService.taskWithoutGroupBy.filter(data =>{
        return data._id == this.taskSelected._id
      })[0];

    },err=>{
      this.popUp.simpleMessage(
        "Internal error deleting a member of the task","error",2000);
    });
  }

  taskDetails(drawer, item){ this.taskSelected=item; drawer.toggle();}
}
