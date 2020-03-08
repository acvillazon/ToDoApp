import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { ListOfComponent } from './components/list-of/list-of.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ToDoComponent,
    DashboardCardComponent,
    ListOfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    MatSidenavModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
