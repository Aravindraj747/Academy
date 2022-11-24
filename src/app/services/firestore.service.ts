import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Registration} from "../components/model/registration";
import {Student} from "../components/model/student";
import {Question} from "../components/model/question";
import { Answer } from '../components/model/answer';
import { collection, deleteDoc, doc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  student!: Student;

  isStudent!: string;

  isAdmin!: string;

  constructor(private firestore: AngularFirestore) { }

// Add new registration
  register(registration: Registration) {
    return this.firestore.collection("registration").add(registration);
  }

//Adding new student login data
  studentCreation(student:Student){
    return this.firestore.collection("studentLogin").doc(student.email).set(student);
  }

// To Upload Question
  uploadQuestion(question:Question){
    return this.firestore.collection('questions').doc(question.topic).set(question);
  }

// Student to upload answer
  uploadAnswer(answer: Answer){
    console.log('in firestoreservice');
    console.log(answer.submitedBy);
    return this.firestore.collection('answers').doc(answer.submitedDate).set(answer);
  }

// To display question to student
  getQuestions(){
    return this.firestore.collection('questions');
  }

// get student details to display in admin home
  getStudents(){
    return this.firestore.collection('studentLogin');
  }

// to get the login student details
  getStudent(email:string){
    return this.firestore.collection('studentLogin').doc<Student>(email).get().subscribe(res => {
      this.student = <Student>res.data();
      sessionStorage.setItem('studentLogin', this.isStudent);
      sessionStorage.setItem('studentData', JSON.stringify(this.student));
    });
  }

// Checking student loggedin or not for Authguard
  getStudentLogin() {
    if (this.isStudent === undefined) {
      this.isStudent = sessionStorage.getItem('studentLogin')!;
    }
    return this.isStudent;
  }

// Checking admin loggedin or not for Authguard
  getAdminLogin(){
    if(this.isAdmin === undefined){
      this.isAdmin = sessionStorage.getItem('adminLogin')!;
    }
    return this.isAdmin;
  }

// get student details for loggedin student using email
  getStudentDetails(){
    if (this.student === undefined) {
      this.student = JSON.parse(sessionStorage.getItem('studentData')!);
    }
    return this.student;
  }

// 
  // getQuestionDetail(type:string){
  //   return this.firestore.collection('questions',ref=>ref.where('topic','==',type));
  // }

// get answer and disply to admin
  getAnswers(){
    return this.firestore.collection('answers');
  }

// get answer from respective stduent to display in adminhome
  getCurrentStudentAnswer(email:string){
    console.log(email);
    // return this.firestore.collection('answers',ref=>ref.where('submitedBy','==',email));
    // return this.firestore.collection('answers').doc(email);
    return this.firestore.collection('answers').ref.where('submitedBy', '==', email);
  }

  //     
  // getStudentAnswer(email:string){
  //   return this.firestore.collection('answers').ref.where('submitedBy','==',email);
  //   }
}
