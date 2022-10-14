import { Component, OnInit } from '@angular/core';
import {Registration} from "../model/registration";
import {FirestoreService} from "../../services/firestore.service";

import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registration: Registration = {
    collegeName: "",
    department: "",
    emailAddress: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    year: "",
    registrationDate: Timestamp.now()
  };

  isRegistrationCompleted: boolean = false;
  spinnerActive: boolean = false;

  constructor(private firestoreService: FirestoreService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  register() {
    this.spinnerActive = true;
    console.log(this.registration)
    if (!this.registrationValidator()) {
      this.spinnerActive = false;
      return;
    }
    this.registration.registrationDate = Timestamp.now()
    this.firestoreService.register(this.registration).then(res => {
      console.log("registered");
      this.spinnerActive = false;
      this.isRegistrationCompleted = true;
    }).catch(err => {
      console.log(err);
      this.spinnerActive = false;
      this.openSnackBar('Error occurred', 'Try again')
    })
  }

  registrationValidator(): boolean {
    console.log(this.registration);
    if (this.registration.firstName === '') {
      this.openSnackBar('Enter the FirstName', 'Retry');
      return false;
    }
    if (this.registration.lastName === '') {
      this.openSnackBar('Enter the Lastname', 'Retry');
      return false;
    }
    if (this.registration.emailAddress === '' || this.registration.emailAddress === undefined) {
      this.openSnackBar('Enter the Email address', 'Retry');
      return false;
    }
    if (this.registration.phoneNumber === '') {
      this.openSnackBar('Enter valid Phone number', 'Retry');
      return false;
    }
    if (this.registration.collegeName === '') {
      this.openSnackBar('Enter College Name', 'Retry');
      return false;
    }
    if (this.registration.year === '') {
      this.openSnackBar('Enter the year', 'Retry');
      return false;
    }
    if (this.registration.department === '') {
      this.openSnackBar('Enter the Department', 'Retry');
      return false;
    }
    return true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
