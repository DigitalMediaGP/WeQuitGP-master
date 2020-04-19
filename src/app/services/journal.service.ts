import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Journal } from '../model.Journal';
import { userinfo } from '../userinfo';
import { vapeinfo } from '../vapeinfo';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { element } from 'protractor';

//journal service handles the user information for the diary(journal), the quit smoking and vaping form.

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  //diary enterees
  journals: Observable<any>;
  journalCollection: AngularFirestoreCollection<Journal>; //makes connection to firebase.

  //the collection of user data in memory
  users: Observable<any>; //smoking users
  vapeusers: Observable<any>; //vaping users 

  //used to connect to the collection of userinfo objects in firebase
  usersCollection: AngularFirestoreCollection<userinfo>; //connecting to smoking users in firebase
  vapeusersCollection: AngularFirestoreCollection<vapeinfo>; //connecting to vaping users in firebase

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
  }

  //bring all users smoking data from the database into memory
  getUsers(): Observable<any> {
    //get collection from 'user' on firebase
    this.usersCollection = this.afs.collection<userinfo>('user'); //userinfo is the placeholder for storing smoking habit data. (userinfo.ts)

    //Save all the users smoking habit info into a collection to access in memory.
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.users;
  }

  //bring users vaping data from the database into memory
  getVapeUsers(): Observable<any> {

    //get collection from 'vapeform' on firebase
    this.vapeusersCollection = this.afs.collection<vapeinfo>('vapeform');  //vapeinfo is the placeholder for storing vaping habit data. (vapeinfo.ts)

    //Save all the users vaping habit info into a collection to access in memory.
    this.users = this.vapeusersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.users;
  }

    //bring users diary data from the database into memory
  getJournals(): Observable<any> {
    this.journalCollection = this.afs.collection<Journal>('journals');
    this.journals = this.journalCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.journals;
  }
      //bring users diary data from the database into memory
  getJournal(id: string): Observable<Journal> {
    return this.journalCollection.doc<Journal>(id).valueChanges().pipe(
      take(1),
      map(journal => {
        journal.id = id;
        return journal
      })
    );
  }

// add users vape habit information to database
  addVapeUser(user: vapeinfo): Promise<DocumentReference> {
    return this.vapeusersCollection.add(user);
  }

  // add users smoking habit information to database
  adduser(user: userinfo): Promise<DocumentReference> {
    return this.usersCollection.add(user);
  }

  //update users vaping habit information
  updateVapeUser(user: vapeinfo): Promise<void> {
    return this.vapeusersCollection.doc(user.id).update({
      bottlespurchasedweekly: user.bottlespurchasedweekly,
      flavour: user.flavour,
      priceofbottle: user.priceofbottle,
      startdate: user.startdate,
      UserName: user.UserName,
      useperday: user.useperday,
      quitdate: user.quitdate
    });
  }

  //update users smoking habit information
  updateuser(user: userinfo): Promise<void> {
    return this.usersCollection.doc(user.id).update({
      Brand: user.Brand,
      CigarettesADay: user.CigarettesADay,
      CigarettesPerBox: user.CigarettesPerBox,
      CostOfBox: user.CostOfBox,
      UserName: user.UserName,
      YearsSmoking: user.YearsSmoking,
      QuitDate: user.QuitDate
    });
  }

  //not being used - function to delete all user information from database
  deleteuser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }

  //add diary entry
  addJournal(journal: Journal): Promise<DocumentReference> {
    return this.journalCollection.add(journal);
  }
  //update diary entry
  updateJournal(journal: Journal): Promise<void> {
    return this.journalCollection.doc(journal.id).update({ name: journal.name, notes: journal.notes });
  }
  //delete diary entry
  deleteJournal(id: string): Promise<void> {
    return this.journalCollection.doc(id).delete();
  }
}