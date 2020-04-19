import { Component, OnInit } from '@angular/core';
import { JournalService } from '../services/journal.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { vapeinfo } from '../vapeinfo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vapeform',
  templateUrl: './vapeform.page.html',
  styleUrls: ['./vapeform.page.scss'],
})
export class VapeformPage implements OnInit {

  constructor(private service: JournalService, public afAuth: AngularFireAuth, private router: Router) {
    //get a hold of the user logged into app
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }
  //load in the details for the user.. get a hold of this data
  userDetails: Observable<any>
  addThisUser: vapeinfo
  myDate = new Date().toISOString(); // date picker format
  user: firebase.User;
  updateUser: number;
  //variable to be added as user information to be database
  bottlespurchasedweekly: number
  flavour: string
  priceofbottle: number
  startdate: number
  quitdate: number
  useperday: number

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userDetails = this.service.getVapeUsers() //loads in users vaping habit information
    this.updateUser = 0
    this.userDetails.forEach(async element => {

      for (let index = 0; index < element.length; index++) {
        //loops through the collection of vapeusers and finds the users vape details thats logged into the app 
        if (element[index].UserName == this.user.email) {
          this.addThisUser = element[index]
          this.bottlespurchasedweekly = element[index].bottlespurchasedweekly
          this.flavour = element[index].flavour
          this.priceofbottle = element[index].priceofbottle
          this.startdate = element[index].startdate
          this.quitdate = element[index].quitdate
          this.useperday = element[index].useperday
          this.updateUser = 1  //user found 
        }
      }
    })
  }

  addVapeUser() {
    //if the users vape information is already stored in firebase. 
    if (this.updateUser == 1) {
      this.addThisUser.bottlespurchasedweekly = this.bottlespurchasedweekly
      this.addThisUser.flavour = this.flavour
      this.addThisUser.priceofbottle = this.priceofbottle
      this.addThisUser.startdate = this.startdate
      this.addThisUser.quitdate = this.quitdate
      this.addThisUser.useperday = this.useperday
      this.service.updateVapeUser(this.addThisUser).then(() => {
        this.router.navigateByUrl('/home');
        alert('Statistics updated');

      })
    }
    else //  no vape information added for that user. ( user needs to add their vape habit info)
    {
      this.addThisUser =
      {
        bottlespurchasedweekly: this.bottlespurchasedweekly,
        flavour: this.flavour,
        priceofbottle: this.priceofbottle,
        startdate: this.startdate,
        quitdate: this.quitdate,
        useperday: this.useperday,
        UserName: this.user.email
      }
      this.service.addVapeUser(this.addThisUser).then(() => {
        // this.router.navigateByUrl('/home');
        console.log(this.addVapeUser)
        alert('Statistics saved');
      });
    }
  }


}





