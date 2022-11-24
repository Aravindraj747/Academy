import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthguardGuard } from './authguard/admin-authguard.guard';
import { StudentAuthguardGuard } from './authguard/student-authguard.guard';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { StudenthomeComponent } from './components/studenthome/studenthome.component';
import {StudentloginComponent} from "./components/studentlogin/studentlogin.component";

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:HomeComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'register',
    component:RegisterComponent,
  },
  {
    path:'adminlogin',
    component:AdminloginComponent
  },
  {
    path:'adminhome',
    component:AdminhomeComponent,
    canActivate: [AdminAuthguardGuard]
  },
  {
    path:'studentlogin',
    component:StudentloginComponent,
  },
  {
    path:'studenthome',
    component:StudenthomeComponent,
    canActivate: [StudentAuthguardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
