import {Injectable} from '@angular/core';
import {Student} from "../components/model/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  student!: Student;

  isStudent!: string;

  constructor() {
  }

  saveStudent(student: Student) {
    this.isStudent = 'true';
    this.student = student;
    sessionStorage.setItem('studentLogin', this.isStudent);
    sessionStorage.setItem('studentData', JSON.stringify(this.student));
  }

  getStudentDetails() {
    if (this.student === undefined) {
      this.student = JSON.parse(sessionStorage.getItem('studentData')!);
    }
    return this.student;
  }
}
