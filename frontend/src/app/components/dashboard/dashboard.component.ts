import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DashBoard } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { UserService } from '../../services/user.service';
import { PopUpService } from '../../services/pop-up.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dash:DashBoard=new DashBoard();
  dashList:DashBoard[]=[];
  constructor(
    private dashS:DashboardService,
    public userService:UserService,
    private popUp:PopUpService
    ) { 
  }
  
  getDash(){
    this.dashS.getMyDash().subscribe(data =>{
      this.dashList=(data["dashboards"]);
    });
  }
  
  ngOnInit(): void {
    this.getDash();
    this.userService.getUsers().subscribe(data =>{
      this.userService.users=data['Users'];
    });
  }

  newDash(){
    Swal.fire({
      title: 'Dashboard name',
      input: 'text',
      inputAttributes: { autocapitalize: 'off'},
      showCancelButton: true,
      confirmButtonText: 'Create',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        this.dash.title=login;
        this.dash.creationDate = new Date();
        this.dash.status=true;
      },
    }).then((result) => {
      if(result.dismiss)return;

      if(result.value=='' && this.dash.title==''){
        return this.popUp.simpleMessage("it's necessary to set a title","error", 1500);
      }

      Swal.fire({
        title: 'Wait a minute...',
        icon: 'info',
      });

      Swal.showLoading();
      this.sendDataToSave(this.dash);
    })
  }
  
  sendDataToSave(dash:DashBoard){
    this.dashS.createDashboard(dash).subscribe((data) =>{
      this.dashList.push(data["dashboard"]);

      Swal.close();
      this.popUp.simpleMessage("Dashboard created",'success',1500);
    },err=>{
      Swal.close();
      this.popUp.simpleMessage("Error saving data",'error',1500);
    });
  }

  removeDashboard(event:string){
    this.popUp.simpleMessage("Wait a minute...",'info',3000);
    Swal.showLoading();

    var eventJSON = JSON.parse(event);
    this.dashS.removeDash(eventJSON.id).subscribe(data =>{
      this.dashList.splice(eventJSON['index'],1);
      Swal.close();
      this.popUp.simpleMessage("The dashboard have been eliminated","success",1500);
    },err=>{
      Swal.close();
      this.popUp.simpleMessage("Error removing data","error",1500);
    });
  }

  removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}

}
