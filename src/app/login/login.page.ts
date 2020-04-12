import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { JournalService } from '../services/journal.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	username: string = ""
	password: string = ""
	constructor(public afAuth: AngularFireAuth, public user: JournalService, public router: Router) { }
	ngOnInit() {
	}
	async login() {
		const { username, password } = this
		try {
		    await this.afAuth.auth.signInWithEmailAndPassword(username + '@wequit.com', password)
			this.router.navigate(['/home'])
		} catch(err) {
			alert(err)
		}
	}

}
