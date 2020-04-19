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
    //get a hold of the user logged into app
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }
  //load in details for the user.
  private userDetails: Observable<any>;
  user: firebase.User = null;

  brand: string = ""
  CigarettesADay: number = 0
  CigarettesPerBox: number = 0
  CostOfBox: number = 0
  YearsSmoking: number = 0
  QuitDate: number = 0


  //variables for calculating financial information
  CostPerCigarette: number
  costPerDay: number
  costPerWeek: number
  costPerMonth: string
  costPerYear: string

  ngOnInit() {
  }
  ionViewWillEnter() {

    this.userDetails = this.service.getUsers()
    this.userDetails.forEach(element => {
      for (let index = 0; index < element.length; index++) { //loop through collection until users details match up with users email logged in. 

        if (element[index].UserName == this.user.email) {
          this.brand = element[index].Brand
          this.CigarettesADay = element[index].CigarettesADay
          this.CigarettesPerBox = element[index].CigarettesPerBox
          this.CostOfBox = element[index].CostOfBox
          this.YearsSmoking = element[index].YearsSmoking
          this.QuitDate = element[index].QuitDate

          //calculations for for financial information
          this.CostPerCigarette = parseFloat((this.CostOfBox / this.CigarettesPerBox).toFixed(2))  // cost per cigarette
          this.costPerDay = parseFloat((this.CigarettesADay * this.CostPerCigarette).toFixed(2))   //cost per day
          this.costPerWeek = parseFloat((Math.round(this.costPerDay * 7 * 100) / 100).toFixed(2)) //cost per week 
          this.costPerMonth = parseFloat((this.costPerDay * 28).toString()).toFixed(2) //cost per month
          this.costPerYear = parseFloat((this.costPerWeek * 28).toString()).toFixed(2) //cost per year
        }
      }
    })
  }
}

