import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationserviceService} from "../../services/authenticationservice.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FirestoreService} from 'src/app/services/firestore.service';
import {StudentService} from "../../services/student.service";
import {Student} from "../model/student";

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {

  studentForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthenticationserviceService,
              private route: Router,
              private _snackBar: MatSnackBar,
              private firestoreService: FirestoreService,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
  }

  get email() {
    return this.studentForm.get('email');
  }

  get password() {
    return this.studentForm.get('password');
  }

  submit() {
    const {email, password} = this.studentForm.value;
    this.authService.isStudent(email!).subscribe(res => {
        res.forEach(ee => {
          console.log(ee.data())
          this.studentService.saveStudent(<Student>ee.data());
        })
        if (res.docs.length > 0) {
          console.log('in auth');
          this.authService.studentLogin(email!, password!).then((res) => {
            this.route.navigate(['studenthome']);
          }).catch(err => {
            this.openSnackBar('Unable to login', 'Retry');
          })
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
