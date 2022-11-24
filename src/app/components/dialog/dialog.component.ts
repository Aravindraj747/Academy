import {Component, Inject, OnInit} from '@angular/core';
import {Question} from "../model/question";
import firebase from "firebase/compat";
import firestore = firebase.firestore;
import {FirestoreService} from "../../services/firestore.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  question: Question | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private firestoreService: FirestoreService) {
    console.log(data);
    this.question = data['question'];
  }

  ngOnInit(): void {
  }
}
