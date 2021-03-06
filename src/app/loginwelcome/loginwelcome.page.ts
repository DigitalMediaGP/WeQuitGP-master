import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { JournalService } from '../services/journal.service';
import { Observable } from 'rxjs';
import { userinfo } from '../userinfo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loginwelcome',
  templateUrl: './loginwelcome.page.html',
  styleUrls: ['./loginwelcome.page.scss'],
})
export class LoginwelcomePage implements OnInit {

  constructor(private service: JournalService, public afAuth: AngularFireAuth, private router: Router) {
    //get a hold of the user in the app
    afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(this.user)
    });
  }

  user: firebase.User = null; //getting user email from firebase to display on welcome page.

  ngOnInit() {
  }

}
