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
@Injectable({
  providedIn: 'root'
})
export class JournalService {
  //original journal info... not used atm
  journals: Observable<any>;
  journalCollection: AngularFirestoreCollection<Journal>;
  //the collection of user data in memory
  users: Observable<any>;
  vapeusers: Observable<any>;
  //used to connect to the collection of userinfo objects in firebase
  usersCollection: AngularFirestoreCollection<userinfo>;
  vapeusersCollection: AngularFirestoreCollection<vapeinfo>;
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
  }
  //bring all users from the database into memory
  getUsers(): Observable<any> {
     //get collection from 'user' on firebase
     this.usersCollection = this.afs.collection<userinfo>('user');
     //now save all the info into a collection we can access in memory.
     this.users = this.usersCollection.snapshotChanges().pipe(
       map(actions => {
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { id, ...data };
         });
       })
     );
     this.users.forEach(element=>{console.log(element)})
     console.log("testing changes")
     return this.users;
  }

  //bring all users from the database into memory
  getVapeUsers(): Observable<any> {
    //get collection from 'user' on firebase
    this.vapeusersCollection = this.afs.collection<vapeinfo>('vapeform');
    //now save all the info into a collection we can access in memory.
    this.users = this.vapeusersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.users.forEach(element=>{console.log(element)})
    console.log("testing changes")
    return this.users;
 }
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
  getJournal(id: string): Observable<Journal> {
    return this.journalCollection.doc<Journal>(id).valueChanges().pipe(
      take(1),
      map(journal => {
        journal.id = id;
        return journal
      })
    );
  }
  addVapeUser(user: vapeinfo):Promise<DocumentReference>{
    return this.vapeusersCollection.add(user);
  }
  adduser(user: userinfo): Promise<DocumentReference> {
    return this.usersCollection.add(user);
  }

  updateVapeUser(user:vapeinfo):Promise<void>{
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
  deleteuser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }
  addJournal(journal: Journal): Promise<DocumentReference> {
    return this.journalCollection.add(journal);
  }
  updateJournal(journal: Journal): Promise<void> {
    return this.journalCollection.doc(journal.id).update({ name: journal.name, notes: journal.notes });
  }
  deleteJournal(id: string): Promise<void> {
    return this.journalCollection.doc(id).delete();
  }
}