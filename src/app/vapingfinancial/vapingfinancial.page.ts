import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { JournalService } from '../services/journal.service';
import { Observable } from 'rxjs';
import { userinfo } from '../userinfo';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-vapingfinancial',
  templateUrl: './vapingfinancial.page.html',
  styleUrls: ['./vapingfinancial.page.scss'],
})
export class VapingfinancialPage implements OnInit {

  constructor(private service: JournalService, public afAuth: AngularFireAuth, private router: Router) {
    //get a hold of the user in the app
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }
  //load in the details for the user.
  private userDetails: Observable<any>;
  user: firebase.User = null;

bottlespurchasedweekly:number =0
flavour:string = ""
priceofbottle:number = 0
startdate:number = 0
quitdate:number = 0
useperday:number = 0


  //variables for calculating financial information
  costPerDay:number 
  costPerWeek:number
  costPerMonth:number
  costPerYear:string

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.userDetails = this.service.getVapeUsers()
    this.userDetails.forEach(element => {
      console.log(element)
      for (let index = 0; index < element.length; index++) { //loop through collection until users details match up with users email logged in. 
        if (element[index].UserName == this.user.email) {
          this.flavour = element[index].flavour
          this.priceofbottle = element[index].priceofbottle
          this.bottlespurchasedweekly = element[index].bottlespurchasedweekly
          this.startdate = element[index].startdate
          this.quitdate = element[index].quitdate
          this.useperday = element[index].useperday

          //calculations for financial information

          this.costPerDay = parseFloat(((this.priceofbottle*this.bottlespurchasedweekly)/7).toFixed(2))   //cost per day
          this.costPerWeek = parseFloat((this.bottlespurchasedweekly*this.priceofbottle).toFixed(2)) //cost per week 
          this.costPerMonth = parseFloat(((this.priceofbottle*this.bottlespurchasedweekly)*4).toFixed(2)) //cost per month
          this.costPerYear = parseFloat((this.costPerWeek*28).toString()).toFixed(2) //cost per year

        }
      }
    })
  }
}
