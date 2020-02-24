import { Injectable } from '@angular/core';

import { map, take } from 'rxjs/operators';
import {Observable } from 'rxjs';
//import { Journal } from '../model.Journal';

import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 
'@angular/fire/firestore';

export interface Journal {
  id?: string,
  name: string,
  notes: string
}

@Injectable({
  providedIn: 'root'
})
export class JournalService { 
  
  private journals: Observable<Journal[]>;
  private journalCollection: AngularFirestoreCollection<Journal>;

  constructor(private afs: AngularFirestore) {
    this.journalCollection = this.afs.collection<Journal>('journals');
    this.journals = this.journalCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }
   


   getJournals(): Observable<Journal[]> {
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

  addJournal(journal: Journal): Promise<DocumentReference> {
    return this.journalCollection.add(journal);
   }

   updateJournal(journal: Journal): Promise<void> {
    return this.journalCollection.doc(journal.id).update({ name: journal.name, notes: journal.notes});
  }

  deleteJournal(id: string): Promise<void> {
    return this.journalCollection.doc(id).delete();
  }

}
