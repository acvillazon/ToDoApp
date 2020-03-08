import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DashBoard } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
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
    public userService:UserService
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
      title: 'Enter name for the new dashboard',
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
      this.getDash();

      Swal.close();
      
      Swal.fire({
        title: 'Dashboard created',
        timer: 1500,
        icon: 'success',
      });


    },err=>{
      
      Swal.fire({
        title: 'Error',
        timer: 1800,
        icon: 'error',
      });
      
    });
  }

}
