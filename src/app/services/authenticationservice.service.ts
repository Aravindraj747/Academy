import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth,signInWithEmailAndPassword,authState,createUserWithEmailAndPassword} from '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as querystring from "querystring";
import {Student} from "../components/model/student";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationserviceService {

  currentUser$ = authState(getAuth(this.app));
  
  constructor(private fireauth: AngularFireAuth,private app:FirebaseApp, private firestore:AngularFirestore) { }
// Create login for Student
  createStudent(email:string,password:string){
    const auth = getAuth(this.app);
    console.log('increate stude')
    return createUserWithEmailAndPassword(auth,email,password);
  }
// Student Login
  studentLogin(email:string,password:string){
    const auth = getAuth(this.app);
    console.log('in login');
    return signInWithEmailAndPassword(auth,email,password);
  }
// Admin Logout
  adminLogout(){
    return this.fireauth.signOut();
  }
// Student Logout
  studentLogout(){
    sessionStorage.removeItem('studentLogin');
    sessionStorage.removeItem('studentData');
    return this.fireauth.signOut();
  }
// Checking Login student
  isStudent(id:string){
    return this.firestore.collection('studentLogin',ref=> ref.where("email", "==", id)).get();
  }
}
