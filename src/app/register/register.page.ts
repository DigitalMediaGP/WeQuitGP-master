import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore } from '@angular/fire/firestore'
//import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	username: string = ""
	password: string = ""
	cpassword: string = "" //make sure passwords match

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public alertController: AlertController,
		public router: Router
	) { }



	ngOnInit() {
	}

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async register() {
		const { username, password, cpassword } = this
		if (password !== cpassword) {
			return alert("Passwords do mot match")
		}
		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@wequit.com', password)
			this.presentAlert('Success', 'You are registered!') //alert 
			this.router.navigate(['/welcomepage']) //once user is registered - sign them in and navigate use to welcome page
		} catch (error) {
			alert(error); //user name is already taken
		}
	}

}
