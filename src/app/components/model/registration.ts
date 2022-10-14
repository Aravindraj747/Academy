import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface Registration {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  collegeName: string;
  year: string;
  department: string;
  registrationDate: Timestamp
}
