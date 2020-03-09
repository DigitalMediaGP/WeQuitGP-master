import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
// import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


	@ViewChild('signupSlider', {static: true}) signupSlider;

	public slideOneForm: FormGroup;
	public slideTwoForm: FormGroup;

	public submitAttempt = false;

	username = ''
	password = ''
	cpassword = ''

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public alertController: AlertController,
		public router: Router,
		formBuilder: FormBuilder
		) { this.slideOneForm = formBuilder.group({
	        username: [''],
	        password: [''],
	        cpassword: ['']
		});

		    this.slideTwoForm = formBuilder.group({
				howMuch: [''],
				pricePer: [''],
				noPack: [''],
				howSoon: ['']
        });

		}


		next() {
			this.signupSlider.slideNext();
		}

		prev() {
			this.signupSlider.slidePrev();
		}
		 save() {
		}

	  ngOnInit() {
	}

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		});

		await alert.present();
	}

	async register() {
		const { username, password, cpassword } = this;
		if (password !== cpassword) {
			return alert('Passwords do mot match');
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@wequit.com', password);

			this.presentAlert('Success', 'You are registered!');
			this.router.navigate(['/home']);

		} catch (error) {
			console.dir(error);
		}
	}

}
