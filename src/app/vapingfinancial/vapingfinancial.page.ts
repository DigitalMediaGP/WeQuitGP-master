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
      //console.log(this.user)
    });
  }
  //load in the details for the user.. get a hold of this data
  private userDetails: Observable<any>;
  user: firebase.User = null;
  //variable to be added as user information to be database

  // brand: string = ""
  // CigarettesADay: number = 0
  // CigarettesPerBox: number = 0
  // CostOfBox: number = 0
  // YearsSmoking: number = 0
  // QuitDate:number =0

bottlespurchasedweekly:number =0
flavour:string = ""
priceofbottle:number = 0
startdate:number = 0
quitdate:number = 0
useperday:number = 0
  //for deciding if user should update or add

  //variables for calculating fincial information
  costPerDay:number 
  costPerWeek:number
  costPerMonth:number
  costPerYear:string
  //updateUser:number
  ngOnInit() {
  }
  ionViewWillEnter() {
    //console.log(this.userDetails.forEach(element))
    //this.updateUser = 0
    this.userDetails = this.service.getVapeUsers()
    console.log(this.userDetails)
    this.userDetails.forEach(element => {
      console.log(element)
      for (let index = 0; index < element.length; index++) {
        //add all of the previously entered 
        if (element[index].UserName == this.user.email) {
          this.flavour = element[index].flavour
          this.priceofbottle = element[index].priceofbottle
          this.bottlespurchasedweekly = element[index].bottlespurchasedweekly
          this.startdate = element[index].startdate
          this.quitdate = element[index].quitdate
          this.useperday = element[index].useperday

          //calculations for finanicla information

          this.costPerDay = parseFloat(((this.priceofbottle*this.bottlespurchasedweekly)/7).toFixed(2))   //cost per day
          this.costPerWeek = parseFloat((this.bottlespurchasedweekly*this.priceofbottle).toFixed(2)) //cost per week 
          this.costPerMonth = parseFloat(((this.priceofbottle*this.bottlespurchasedweekly)*4).toFixed(2)) //cost per month
          this.costPerYear = parseFloat((this.costPerWeek*28).toString()).toFixed(2) //cost per year

          // this.PricePerDay = this.
          console.log(this.costPerYear)
        
          console.log(this.costPerDay)
        }
      }
    })
  }
}
