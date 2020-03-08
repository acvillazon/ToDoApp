import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User=new User();
  rememberMe:boolean=false;
  constructor(
    private router:Router,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(form.invalid) return false;

    Swal.fire({
      allowOutsideClick:true,
      text:'Wait a minute',
      icon:'info'
    });
    
    Swal.showLoading();
    
    this.auth.register(this.user).subscribe(data =>{
      this.router.navigateByUrl("/toDo");
      this.rememberMe?localStorage.setItem("email", this.user.email.toLowerCase()):null;
    },err =>{
      Swal.fire({
        allowOutsideClick:true,
        title:'Register error',
        icon:'error',
        text: err.error.error.message
      });
    });
  }

}
