import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { RedirectGuard } from './guard/redirect.guard';
import { NoSessionFoundGuard } from './guard/no-session-found.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListOfComponent } from './components/list-of/list-of.component';


const routes: Routes = [
  {path:'', component:LandingComponent, canActivate:[RedirectGuard]},
  {path:'login', component:LoginComponent, canActivate:[RedirectGuard]},
  {path:'register', component:RegisterComponent, canActivate:[RedirectGuard]},
  {
    path:'toDo', 
    component:ToDoComponent, 
    canActivate:[NoSessionFoundGuard], 
    children:[
      {path:'', component:DashboardComponent},
      {path:'dashboard/:id', component:ListOfComponent},
    ]
  },
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
