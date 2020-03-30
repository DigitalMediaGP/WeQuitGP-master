import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { JournalService } from 'src/app/services/journal.service';
import {Journal} from '../model.Journal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {
  user: firebase.User;
  private journals:Observable<Journal[]>;
  private journal:Journal;
  userjournals:Journal[] = []
  private updateview:boolean = false
  constructor(private journalService: JournalService, public afAuth: AngularFireAuth) 
  {
    //get a hold of the user in the app
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  } 
  ngOnInit() { 
    this.journals = this.journalService.getJournals();  
  }
  ionViewWillEnter(){
    //only update view whne this variable is set 
    this.updateview = true
    //empty array to avoid displaying duplicates
    this.userjournals = []
    //this logic will automatically be called when the observable collection is interacted with
    this.journals.forEach(element => {
      //loop though the entries
      //only allowing view to be update when this method is entered (when user actively navigates here)
      console.log(element)
      if(this.updateview)
      {
      for (let index = 0; index < element.length; index++) {
        if(element[index].user==this.user.email)
        {
          //console.log('User found!')
          this.addUserNotes(element[index])
        }         
      }
      this.updateview = false;
      }//end for update view
      else
      {
        //collection was changed while on this page.. don't interfere with user
        console.log("database update")
      }  
  });
}
  //unused for the moment
  ionViewDidLeave(){
    //console.log('leaving view')
    //empty list for next entry
  }
  //add the notes specific to the user to the array for display
  addUserNotes(journalEntry:Journal)
  {
    //console.log(journalEntry)
    this.userjournals.push(journalEntry)
  }

}
