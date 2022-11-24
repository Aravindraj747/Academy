import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthenticationserviceService} from "../../services/authenticationservice.service";
import { Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FirestoreService} from "../../services/firestore.service";
import {Student} from "../model/student";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Storage, getDownloadURL, uploadBytesResumable,ref } from '@angular/fire/storage';
import {getStorage} from 'firebase/storage';
import {Question} from "../model/question";
import { Answer } from '../model/answer';
import { EmailAuthCredential } from 'firebase/auth';
import { doc } from 'firebase/firestore';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];


  url:any; 
  topic:any;
  questionTopic:any;
  file:any = undefined;

  isLoginCreation:boolean = false;
  isUploadQuestion:boolean = false;
  loginSpinnerActive: boolean = false;
  isShowAnswer: boolean = false;

  panelOpenState = false;

  studentDetails: Student[] | undefined;

  allAnswers: Answer[] =[];

  answer: Answer[] = [];

  student:Student={
    name:'',
    email:'',
    phoneNumber:'',
    password:'',
  };

  question:Question={
    topic:'',
    question:'',
    url:'',
  }

  studentForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthenticationserviceService,
              private route: Router,
              private firestoreService: FirestoreService,
              private _snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    const studentArray: Student[] = [];
    this.firestoreService.getStudents().ref.get().then((res)=>{
      res.forEach(function(doc){
        studentArray.push(<Student>doc.data());
      });
    });
    this.studentDetails = studentArray;
    // console.log(this.studentDetails);
    let answerArray: Answer[] = [];
    this.firestoreService.getAnswers().ref.get().then((res)=>{
      res.forEach(function(doc){
        answerArray.push(<Answer>doc.data());
      });
    });
    this.allAnswers = answerArray;
    // console.log(this.allAnswers);
  }
  //Login credentials
  get name(){
    return this.studentForm.get('name');
  }
  get email(){
    return this.studentForm.get('email');
  }
  get password(){
    return this.studentForm.get('password');
  }
  get phoneNumber(){
    return this.studentForm.get('phoneNumber');
  }

  //Creating student login
  submit(){
    this.loginSpinnerActive=true;
    const {name,email,phoneNumber,password}=this.studentForm.value;
    this.student.name=name!;
    this.student.email=email!;
    this.student.phoneNumber=phoneNumber!;
    this.student.password=password!;
    // console.log(name,email,password);
    this.authService.createStudent(email!,password!).then(res=>{
      console.log('created')
      this.firestoreService.studentCreation(this.student).then(()=>{
        console.log('registered');
        this.resetLoginCreation();
        this.loginSpinnerActive=false;
        this.route.navigate(['adminhome']);
        this.isLoginCreation=false;
        this.openSnackBar('Registered','undo');
      }).catch(err => {
        console.log(err);
        this.loginSpinnerActive = false;
        this.openSnackBar('Error occurred', 'Try again')
      })
    });
  }

  resetLoginCreation(){
    this.student = {
      name:'',
      email:'',
      phoneNumber:'',
      password:'',
    }
  }
  //For displaying content
  loginCreation(){
    this.isLoginCreation=true;
    this.isUploadQuestion=false;
    this.isShowAnswer = false;
  }
  home(){
    this.isLoginCreation=false;
    this.isUploadQuestion=false;
    this.isShowAnswer = false;
  }
  upload(){
    this.isUploadQuestion=true;
    this.isLoginCreation=false;
    this.isShowAnswer = false;
  }

  showAnswer(){
    this.isShowAnswer = true; 
    this.isLoginCreation = false;
    this.isUploadQuestion = false;
  }

  //Upload question
  chooseFile(event:any){
    this.file= event.target.files[0];
  }

  uploadQuestion(topic:string,question:string){
    this.topic=topic;
    this.questionTopic=question;
    console.log(this.topic,this.questionTopic);
    if (this.file != undefined){
      // console.log(this.file);
      this.putFile(this.file);
    }
    else{
      this.loginSpinnerActive = false;
      this.openSnackBar('upload the file', 'Retry');
    }
  }
  resetQuestionForm(){
    this.question = {
      topic:'',
      question:'',
      url:'',
    }
  }

  //Snackbar
  openSnackBar(message:string,action:string){
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  //Upload image to storage
  putFile(file:any) {
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // this.resetQuestionForm();
    return uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        this.openSnackBar('Error occurred while saving images', 'Retry')
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.loginSpinnerActive = true
          this.openSnackBar('Question Saved', 'Undo');
          // console.log(downloadURL);
          this.url=downloadURL;
          console.log('in download',this.url);
          this.putFirestore(this.url);
          },
            ).catch(err => {
              this.openSnackBar('Error Occurred while saving insurance', 'Retry');
            }).finally( ()=> {
              this.loginSpinnerActive = false;
            });
          });
    }

  //Upload question to firestore
  putFirestore(url:string){
    this.question.question=this.questionTopic;
    this.question.topic=this.topic;
    this.question.url=this.url;
    this.firestoreService.uploadQuestion(this.question).then((res)=>{
      console.log('Uploaded to firestore');
    });
  }

  //Admin logout
  logout(){
    this.firestoreService.isAdmin='false';
    this.route.navigate(['adminlogin']);
  }

  //answer for seperate student 
  studentAnswer(email:string){
    var bool =  false;
    const stdAnswer: Answer[] = [];
    this.answer = stdAnswer;
    this.allAnswers.forEach(answer => {
      if (answer.submitedBy === email) {
        bool = true;
        stdAnswer.push(<Answer>answer);
      }
    });
    // console.log(stdAnswer);
    this.answer =  stdAnswer;
    return bool;
  }
}
  export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}