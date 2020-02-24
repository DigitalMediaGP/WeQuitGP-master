import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalService, Journal } from '../services/journal.service';
import { ToastController } from '@ionic/angular';
// import { Journal } from '../model.Journal';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';




@Component({
  selector: 'app-journal-details',
  templateUrl: './journal-details.page.html',
  styleUrls: ['./journal-details.page.scss'],
})
export class JournalDetailsPage implements OnInit {

//private journals: Observable<Journal[]>;

 journal: Journal = {
  name: '',
  notes: ''
 };

 id = null;

  constructor(private activatedRoute: ActivatedRoute, private journalService: JournalService,private toastCtrl: ToastController,private router: Router) {}
    //public navCtrl: NavController,

  ngOnInit() {
    // this.journals = this.journalService.getJournals();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

  }
  
  ionViewWillEnter(){
    if (this.id) {
      this.journalService.getJournal(this.id).subscribe(journal => {
        this.journal = journal;
      });
    }
  }

  addJournal() {
    this.journalService.addJournal(this.journal).then(() => {
      this.router.navigateByUrl('/journalEntryList');
      console.log("Entry added");
      this.showToast('Entry Added');
    }, err=> {
      this.showToast('There was a problem adding your entry:');
    }); 
  }

  deleteJournal() {
    this.journalService.deleteJournal(this.journal.id).then(() => {
      this.router.navigateByUrl('/journalEntryList');
      this.showToast('Entry deleted');
    }, err => {
      this.showToast('There has been a problem deleting your entry');
    });
  }

  updateJournal() {
    this.journalService.updateJournal(this.journal).then(() => {
      this.showToast('Entry Updated');
    }, err => {
      this.showToast('There was a problem updating your entry :(');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 1000
    }).then(toast => toast.present());
  }

}
