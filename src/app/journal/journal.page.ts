import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Journal, JournalService } from '../services/journal.service';

import { Observable } from 'rxjs';



@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {

  private journals: Observable<Journal[]>;
 
  constructor(private journalService: JournalService,
             
  public afAuth: AngularFireAuth ) {}
 

  ngOnInit() {
    
    this.journals = this.journalService.getJournals();
  }


}
