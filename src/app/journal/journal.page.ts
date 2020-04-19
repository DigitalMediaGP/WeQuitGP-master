import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { JournalService } from 'src/app/services/journal.service';
import { Journal } from '../model.Journal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {
  user: firebase.User;
  private journals: Observable<Journal[]>;
  private journal: Journal;
  userjournals: Journal[] = []
  private updateview: boolean = false
  constructor(private journalService: JournalService, public afAuth: AngularFireAuth) {
    //get a hold of the user in the app
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.journals = this.journalService.getJournals();
    this.updateview = true  // when user is viewing the page don't allow interactionn with database ( bug fix for when manaully deleting diary entrys from firebase)
    this.userjournals = []   //empty array to avoid displaying duplicates ( array empties when user exits diary)

    this.journals.forEach(element => {
      //loop though the entries
      //only allowing view to be updated when this method is entered.
      if (this.updateview) {
        for (let index = 0; index < element.length; index++) {
          if (element[index].user == this.user.email) {
            this.addUserNotes(element[index])
          }
        }
        this.updateview = false;
      }
      else {

      }
    });
  }
  //add the notes specific to the user to the array for display
  addUserNotes(journalEntry: Journal) {

    this.userjournals.push(journalEntry)
  }

}
