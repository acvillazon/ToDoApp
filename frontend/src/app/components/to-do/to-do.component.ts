import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.auth.logout();
  }
}
