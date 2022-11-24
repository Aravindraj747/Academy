import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideStorage,getStorage} from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire/compat";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';
// firebase
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

// reactive froms
import {ReactiveFormsModule} from '@angular/forms';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { StudentloginComponent } from './components/studentlogin/studentlogin.component';
import { StudenthomeComponent } from './components/studenthome/studenthome.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { StudentAuthguardGuard } from './authguard/student-authguard.guard';
import { AdminAuthguardGuard } from './authguard/admin-authguard.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    AdminloginComponent,
    AdminhomeComponent,
    StudentloginComponent,
    StudenthomeComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // angular material
    MaterialModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideStorage(() => getStorage()),
  ],
  providers: [
    StudentAuthguardGuard,
    AdminAuthguardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
