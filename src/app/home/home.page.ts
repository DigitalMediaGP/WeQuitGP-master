import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router) { }
  signOut() {
    this.afAuth.auth.signOut(); //sign user out of app when user presses sign out button.
    this.router.navigate([''])
  }


  ngOnInit() {
  }


}


