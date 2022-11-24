import { Component, OnInit } from '@angular/core';
import { Registration } from "../model/registration";
import { FirestoreService } from "../../services/firestore.service";

import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import { MatSnackBar } from "@angular/material/snack-bar";

// form
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // form module
  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    collegeName: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
  });

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
  registrationDate: any;
  spinnerActive: boolean = false;

  constructor(private firestoreService: FirestoreService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }
  get collegeName() {
    return this.registrationForm.get('collegeName');
  }
  get year() {
    return this.registrationForm.get('year');
  }
  get department() {
    return this.registrationForm.get('department');
  }
  register() {
    this.spinnerActive = true;
    const { firstName, lastName, emailAddress, phoneNumber, collegeName, year, department } = this.registrationForm.value;
    this.registration.firstName = firstName!;
    this.registration.lastName = lastName!;
    this.registration.emailAddress = emailAddress!;
    this.registration.collegeName = collegeName!;
    this.registration.year = year!;
    this.registration.department = department!;
    this.registration.registrationDate = Timestamp.now();
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
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}