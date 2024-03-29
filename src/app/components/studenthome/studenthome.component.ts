import {Component, OnInit} from '@angular/core';
import {Question} from "../model/question";
import {FirestoreService} from "../../services/firestore.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {ActivatedRoute, Router} from '@angular/router';
import {Student} from '../model/student';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Answer} from '../model/answer';
import {AuthenticationserviceService} from 'src/app/services/authenticationservice.service';
import {Timestamp} from 'firebase/firestore';
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-studenthome',
  templateUrl: './studenthome.component.html',
  styleUrls: ['./studenthome.component.css']
})
export class StudenthomeComponent implements OnInit {

  questions!: Question[];

  student!: Student;

  time!: Timestamp;

  loginSpinnerActive: boolean = false;

  length!: string;

  answer: Answer = {
    questionName: '',
    url: '',
    submitedBy: '',
    status: 'not yet',
    submitedDate: '',
  }

  ans: Answer[] = [];

  constructor(private fireStoreService: FirestoreService,
              private route: Router,
              public dialog: MatDialog,
              private activateRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private authService: AuthenticationserviceService,
              private studentService: StudentService) {
    this.student = this.studentService.getStudentDetails();
  }

  ngOnInit(): void {
    const questionArray: Question[] = [];
    this.fireStoreService.getQuestions().ref.get().then((res) => {
      res.forEach(function (doc) {
        questionArray.push(<Question>doc.data());
      });
    });
    this.questions = questionArray;
    const ans: Answer[] = [];
    this.fireStoreService.getCurrentStudentAnswer(this.student.email).get().then((res) => {
      res.forEach(function (doc) {
        ans.push(<Answer>doc.data());
      });
      this.ans = ans;
      this.length = this.ans.length.toString();
    });
  }

  checkIfAlreadyAnswered(questionName: string) {
    var isAnswered = false;
    this.ans.forEach(answer => {
      if (answer.questionName === questionName) {
        isAnswered = true;
      }
    });
    return isAnswered;
  }

  openDialog(question: Question) {
    this.dialog.open(DialogComponent, {
      data: {
        question: question
      }
    });
  }

  //Upload answer
  file: any;

  chooseFile(event: any) {
    this.file = event.target.files[0];
  }

  uploadAnswer(questionTopic: string) {
    this.loginSpinnerActive = true;
    this.answer.questionName = questionTopic;
    this.answer.submitedBy = this.student.email;
    console.log(questionTopic);
    if (this.file != undefined) {
      console.log(this.file);
      this.putFile(this.file);
      this.answer.status = 'submitted';
    } else {
      this.loginSpinnerActive = false;
      this.openSnackBar('upload the file', 'Retry');
    }
  }

  putFile(file: any) {
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        this.loginSpinnerActive = false;
        this.openSnackBar('Error occurred while saving images', 'Retry')
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.openSnackBar('Answer Submitted', 'Undo');
            console.log(downloadURL);
            this.answer.url = downloadURL;
            console.log('in download', this.answer.url);
            this.putFirestore(this.answer.url);
            this.loginSpinnerActive = false;
          },
        ).catch(err => {
          this.openSnackBar('Error Occurred while saving answer', 'Retry');
        }).finally(() => {
          this.loginSpinnerActive = false;
        });
      });
  }

  putFirestore(url: string) {
    this.answer.url = url;
    console.log('in put')
    //  this.answer.submitedDate = Timestamp.now().toString();
    this.answer.submitedDate = Math.floor(Date.now() / 1000).toString();
    this.fireStoreService.uploadAnswer(this.answer).then((res) => {
      console.log(res);
      this.ans.push(this.answer);
      console.log('Uploaded to firestore');
    });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  logout() {
    this.authService.studentLogout().then(() => {
      this.fireStoreService.isStudent = 'false';
      this.route.navigate(['studentlogin']);
    });
  }
}
