import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthenticationserviceService} from "../../services/authenticationservice.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {

  studentForm= new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  });
  constructor(private authService: AuthenticationserviceService,
              private route: Router,
              private _snackBar: MatSnackBar,
              private firestoreService: FirestoreService) { }

  ngOnInit(): void {
  }
  get email(){
    return this.studentForm.get('email');
  }
  get password(){
    return this.studentForm.get('password');
  }

  submit(){
    const {email,password}= this.studentForm.value;
    console.log(email,password);
    this.authService.isStudent(email!).subscribe(res=>{
      this.firestoreService.isStudent = 'true';
      console.log('res',res);
      if(res.docs.length>0){
        console.log('in auth');
        this.authService.studentLogin(email!,password!).then((res)=>{
          this.firestoreService.isStudent = 'true';
          this.getStudent(email!).then(()=>{
            this.route.navigate(['studenthome'], { queryParams: { email: email} });
          });
          console.log('Student loggedin');
          }).catch(err => {
          this.openSnackBar('Unable to login', 'Retry');
        })
      }
      }
    );
  }

  async getStudent(email: string) {
    await this.firestoreService.getStudent(email);
}
  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{
      duration:2000
    });
  }
}
