import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationserviceService } from 'src/app/services/authenticationservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  loginSpinnerActive: boolean = false;

  adminForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthenticationserviceService, private route: Router, private _snackBar: MatSnackBar, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
  }

  get email(){
    return this.adminForm.get('email');
  }

  get password() {
    return this.adminForm.get('password');
  }

  submit() {
    const {email, password} = this.adminForm.value;
    console.log(email, password);
    this.loginSpinnerActive = true;
    if (email == "decodetechacademy@gmail.com" && password == "Decode@2022") {
      this.route.navigate(['adminhome']);
      this.firestoreService.isAdmin='true';
      console.log('this.auth');
    } else {
      this.openSnackBar('Invalid Credentials', 'Retry');
      this.loginSpinnerActive = false;
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
