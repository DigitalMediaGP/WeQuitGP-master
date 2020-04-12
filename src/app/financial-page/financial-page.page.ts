import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { JournalService } from '../services/journal.service';
import { Observable } from 'rxjs';
import { userinfo } from '../userinfo';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-financial-page',
  templateUrl: './financial-page.page.html',
  styleUrls: ['./financial-page.page.scss'],
})
export class FinancialPagePage implements OnInit {
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
  brand: string = ""
  CigarettesADay: number = 0
  CigarettesPerBox: number = 0
  CostOfBox: number = 0
  YearsSmoking: number = 0
  QuitDate:number =0
  //for deciding if user should update or add

  //variables for calculating fincial information
  CostPerCigarette:number
  costPerDay:number 
  costPerWeek:number
  costPerMonth:string
  costPerYear:string
  //updateUser:number
  ngOnInit() {
  }
  ionViewWillEnter() {
    //console.log(this.userDetails.forEach(element))
    //this.updateUser = 0
    this.userDetails = this.service.getUsers()
    console.log(this.userDetails)
    this.userDetails.forEach(element => {
      console.log(element)
      for (let index = 0; index < element.length; index++) {
        //add all of the previously entered 
        if (element[index].UserName == this.user.email) {
          this.brand = element[index].Brand
          this.CigarettesADay = element[index].CigarettesADay
          this.CigarettesPerBox = element[index].CigarettesPerBox
          this.CostOfBox = element[index].CostOfBox
          this.YearsSmoking = element[index].YearsSmoking
          this.QuitDate = element[index].QuitDate

          //calculations for finanicla information
          this.CostPerCigarette = parseFloat((this.CostOfBox/this.CigarettesPerBox).toFixed(2))  // cost per cigarette
          this.costPerDay = parseFloat((this.CigarettesADay*this.CostPerCigarette).toFixed(2))   //cost per day
          this.costPerWeek = parseFloat((Math.round(this.costPerDay*7 * 100) / 100).toFixed(2)) //cost per week 
          this.costPerMonth = parseFloat((this.costPerDay*28).toString()).toFixed(2) //cost per month
          this.costPerYear = parseFloat((this.costPerWeek*28).toString()).toFixed(2) //cost per year

          // this.PricePerDay = this.
          console.log(this.costPerYear)
          console.log(this.CostPerCigarette)
          console.log(this.costPerDay)
        }
      }
    })
  }
}

