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

  //variables for calculating money saved 
  numcigtoday:number = 0
  moneySaved:number = 0
  moneySpent:number =0
  morethanaverage: number =0
  lessthanaverage: number =0
  morecigsthanusual: number =0

  //for deciding if user should update or add
  costPerYear:number
  CostPerCigarette:number
  costPerDay:number 
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
          this.brand = element[index].Brand
          this.CigarettesADay = element[index].CigarettesADay
          this.CigarettesPerBox = element[index].CigarettesPerBox
          this.CostOfBox = element[index].CostOfBox
          this.YearsSmoking = element[index].YearsSmoking
          this.QuitDate = element[index].QuitDate
          this.costPerYear = this.CostOfBox*52
          this.CostPerCigarette = parseFloat((this.CostOfBox/this.CigarettesPerBox).toFixed(2)) 
          this.costPerDay = parseFloat((this.CigarettesADay*this.CostPerCigarette).toFixed(2))
        }
      }
    })
  }
  onChange()
  {
    //calculating daliy cost
    var costPerCig = parseFloat((this.CostOfBox/this.CigarettesPerBox).toFixed(2)) 
  //  var oldHabit = costPerCig*this.CigarettesADay //this calculates how much the user WAS spending per cigarette 
    var oldHabitcost = parseFloat((this.CigarettesADay*this.CostPerCigarette).toFixed(2)) 
    var cigSmokedToday = parseFloat((costPerCig*this.numcigtoday).toFixed(2)) //this calculates how much the user IS NOW spending per cigarette
    this.moneySaved = parseFloat((oldHabitcost-cigSmokedToday).toFixed(2)); //this calculates how much the user has saved/spent today.
    this.moneySpent = parseFloat((costPerCig*this.numcigtoday).toFixed(2)); //calculates how much the user spent today.
    this.morethanaverage = parseFloat((this.moneySpent- oldHabitcost).toFixed(2));
    this.lessthanaverage = parseFloat((this.CigarettesADay - this.numcigtoday).toFixed(2));
    this.morecigsthanusual = parseFloat((this.numcigtoday - this.CigarettesADay).toFixed(2));
    
    // alert('you saved  €' + this.moneySaved + 'today!');

    if(this.moneySpent > oldHabitcost){
      alert('Today you smoked ' + this.numcigtoday + ' cigarettes' +' which is '+ this.morecigsthanusual + ' more than your daily average.'+ 'Today your habit cost you ' + '€'+ this.moneySpent + '. This is ' + '€'+ this.morethanaverage  + ' more than it usually costs you. It\'s okay to have an off day, just keep your head up and try again. Tomorrow is always a new day ' + this.user.email +'. Don\'t forget to use the meditation feature to help calm yourself down or download our WeQuit VR app from www.wequit.xyz to help distract yourself when you\'re feeling stressed.')

    } else if(this.numcigtoday == 0){
      
      alert('Congrats on not smoking at all today! You have saved ' + '€'+ oldHabitcost +'.' + ' By the one-day mark you have already decreased your risk of a heart attack. This is because of reduced constriction of veins and arteries as well as increased oxygen levels that go to the heart to boost its functioning.' + ' Keep up the amazing progress ' + this.user.email +'!')

    }else if(this.numcigtoday == 1){
      
      alert('Today you smoked ' + this.numcigtoday + ' cigarette.' + 'This is '+ this.lessthanaverage + ' less than your daily average, great progress! You saved yourself ' + '€' +this.moneySaved +'. Keep up the great work ' + this.user.email +'!' +' Don\'t forget to use the meditation feature to help calm yourself down or download our WeQuit VR app from www.wequit.xyz to help distract yourself when you\'re feeling stressed.')

      
    } else if(this.numcigtoday < this.CigarettesADay){
      console.log('Today you smoked ' + this.numcigtoday + ' cigarettes.' + 'This is less than you usually do, congrats!')
      alert('Today you smoked ' + this.numcigtoday + ' cigarettes.' + 'This is '+ this.lessthanaverage + ' less than your daily average, great progress! You saved yourself ' + '€' +this.moneySaved +'. Keep up the great work ' + this.user.email +'!' +' Don\'t forget to use the meditation feature to help calm yourself down or download the WeQuit VR app from www.wequit.xyz to help distrack yourself when you\'re feeling stressed.')
    
    } else if(this.numcigtoday = this.CigarettesADay){
      alert('Today you smoked your daily average of ' + this.numcigtoday +' cigarettes. This cost you '+ '€'+ this.moneySpent +'. Not to worry though! Tomorrow is always a new day ' + this.user.email +'!')
    } 
  }
 
}

// var moneypercig = this.CostOfBox/this.CigarettesPerBox
// var usualMoney = moneypercig*this.CigarettesADay
// var moneyToday = moneypercig*this.numcigtoday
// this.moneySaved = usualMoney-moneyToday;