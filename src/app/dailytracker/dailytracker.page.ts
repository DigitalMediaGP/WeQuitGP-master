import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { JournalService } from '../services/journal.service';
import { Observable } from 'rxjs';
import { userinfo } from '../userinfo';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dailytracker',
  templateUrl: './dailytracker.page.html',
  styleUrls: ['./dailytracker.page.scss'],
})
export class DailytrackerPage implements OnInit {

  constructor(private service: JournalService, public afAuth: AngularFireAuth, private router: Router) {
    //get a hold of the user in the app
    afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(this.user)
    });
  }
  //load in the details for the user.. get a hold of this data
  private userDetails: Observable<userinfo[]>;
  user: firebase.User = null;
  //variable to be added as user information to be database
  brand: string = ""
  CigarettesADay: number = 0
  CigarettesPerBox: number = 0
  CostOfBox: number = 0
  YearsSmoking: number = 0
  QuitDate:number =0
  //for deciding if user should update or add
  costPerYear:number
  CostPerCigarette:number
  //updateUser:number
  ngOnInit() {
    this.userDetails = this.service.getUsers()
    //console.log(this.userDetails)
  }
  ionViewWillEnter() {
    //this.updateUser = 0
    this.userDetails.forEach(element => {
      console.log(element)
      for (let index = 0; index < element.length; index++) {
        //add all of the previously entered 
        if (element[index].UserName == this.user.email) {
          console.log(this.user.email)
          this.brand = element[index].Brand
          this.CigarettesADay = element[index].CigarettesADay
          this.CigarettesPerBox = element[index].CigarettesPerBox
          this.CostOfBox = element[index].CostOfBox
          this.YearsSmoking = element[index].YearsSmoking
          this.QuitDate = element[index].QuitDate
          this.costPerYear = this.CostOfBox*52
          this.CostPerCigarette = this.CostOfBox/this.CigarettesPerBox
          // this.PricePerDay = this.
          console.log(this.costPerYear)
          console.log(this.CostPerCigarette)
        }
      }
    })
  }
}