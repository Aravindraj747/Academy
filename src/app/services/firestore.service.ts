import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Registration} from "../components/model/registration";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  register(registration: Registration) {
    return this.firestore.collection("registration").add(registration);
  }
}
