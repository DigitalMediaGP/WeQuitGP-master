import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalService} from '../services/journal.service';
import { ToastController } from '@ionic/angular';
import { Journal } from '../model.Journal';
import { Observable } from 'rxjs';
import { userinfo } from '../userinfo';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-journal-details',
  templateUrl: './journal-details.page.html',
  styleUrls: ['./journal-details.page.scss'],
})
export class JournalDetailsPage implements OnInit {
  user: firebase.User;
  journal: Journal = null;
  id = null;
  constructor(private afAuth:AngularFireAuth, private activatedRoute: ActivatedRoute, private journalService: JournalService,private toastCtrl: ToastController,private router: Router) 
  {
    //get a hold of the user in the app
    afAuth.authState.subscribe(user => {
      this.user = user;
    });  
  }
  ngOnInit() {
    //this.journals = this.journalService.getJournals();
    //this.users = this.journalService.getUsers();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    //console.log(this.id)
    this.journal={name:this.activatedRoute.snapshot.paramMap.get('name'),
                  notes:this.activatedRoute.snapshot.paramMap.get('notes'),
                  user:this.activatedRoute.snapshot.paramMap.get('user')};
    //console.log(this.journal)
  }
  ionViewWillEnter(){
    if (this.id) {
    //this.journalService.getJournal(this.id).subscribe(journal => {
    //  console.log(journal)
    //  this.journal = journal;
    //  console.log(this.journal)
    //});
    }
  }
  addJournal() {
    this.journal.user = this.user.email;
    this.journalService.addJournal(this.journal).then(() => {
      this.router.navigateByUrl('/journalEntryList');
      console.log("Entry added");
      this.showToast('Entry Added');
    }, err=> {
      this.showToast('There was a problem adding your entry:');
    }); 
  }
  deleteJournal() {
    this.journal.id = this.id
    this.journalService.deleteJournal(this.journal.id).then(() => {
      this.router.navigateByUrl('/journalEntryList');
      this.showToast('Entry deleted');
    }, err => {
      this.showToast('There has been a problem deleting your entry');
    });
  }
  updateJournal() {
    this.journal.id = this.id
    this.journalService.updateJournal(this.journal).then(() => {
      this.router.navigateByUrl('/journalEntryList');
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