import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User=new User();
  rememberMe:boolean=false;
  
  constructor(
    private auth:AuthService,
    private router:Router) 
  { }

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.user.email=localStorage.getItem('email')
      this.rememberMe=true;
    }
  }

  onSubmit(form:NgForm){
    
    if(form.invalid) return false;

    Swal.fire({
      allowOutsideClick:true,
      text:'Wait a minute.',
      icon:'info'
    });

    Swal.showLoading();
    
    this.auth.login(this.user).subscribe(data =>{
      console.log(data)
      this.router.navigateByUrl("/toDo");
      Swal.close();
      this.rememberMe?localStorage.setItem("email", this.user.email.toLowerCase()):null;
    }, (err) =>{
      Swal.fire({
        allowOutsideClick:true,
        title:'Authentication Error',
        icon:'error',
        text: err.error.event
      });
    });
  }  

}
