import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { JournalService } from '../services/journal.service';
import { Observable } from 'rxjs';
import { userinfo } from '../userinfo';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private service: JournalService, public afAuth: AngularFireAuth, private router: Router) {
    //get a hold of the user logged into app 
    afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(this.user)
    });
  }
  //not used in profile page ( taking from quit form)
  private userDetails: Observable<userinfo[]>;
  user: firebase.User = null;
  brand: string = ""
  CigarettesADay: number = 0
  CigarettesPerBox: number = 0
  CostOfBox: number = 0
  YearsSmoking: number = 0
  QuitDate: number = 0
  costPerYear: number
  CostPerCigarette: number

  ngOnInit() {
    this.userDetails = this.service.getUsers() //get users details 

  }
  ionViewWillEnter() {

    this.userDetails.forEach(element => {
      console.log(element)
      for (let index = 0; index < element.length; index++) { //only display users information who is logged into app 

        if (element[index].UserName == this.user.email) {
          this.brand = element[index].Brand
          this.CigarettesADay = element[index].CigarettesADay
          this.CigarettesPerBox = element[index].CigarettesPerBox
          this.CostOfBox = element[index].CostOfBox
          this.YearsSmoking = element[index].YearsSmoking
          this.QuitDate = element[index].QuitDate
          this.costPerYear = this.CostOfBox * 52
          this.CostPerCigarette = this.CostOfBox / this.CigarettesPerBox


        }
      }
    })
  }
}
