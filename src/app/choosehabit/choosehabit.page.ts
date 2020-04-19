import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { JournalService } from '../services/journal.service';
import { Observable } from 'rxjs';
import { userinfo } from '../userinfo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-choosehabit',
  templateUrl: './choosehabit.page.html',
  styleUrls: ['./choosehabit.page.scss'],
})
export class ChoosehabitPage implements OnInit {

  user: firebase.User = null; //firebase user

  constructor(private service: JournalService, public afAuth: AngularFireAuth, private router: Router) {
    //gets logged in user from firebase
    afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(this.user)
    });
  }



  ngOnInit() {
  }

}
