import { Timestamp } from "firebase/firestore";

export interface Answer{
    questionName: string;
    url: string;
    submitedBy:string;
    status:string;
    submitedDate:string;
}