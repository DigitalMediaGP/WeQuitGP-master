import { Component, OnInit } from '@angular/core';
import { JournalService } from '../services/journal.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { userinfo } from '../userinfo';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-quit-form',
  templateUrl: './quit-form.page.html',
  styleUrls: ['./quit-form.page.scss'],
})
export class QuitFormPage implements OnInit {
  constructor(private service: JournalService, public afAuth: AngularFireAuth, private router: Router) {
    //get a hold of the user logged into app
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }
  //load in the details for the user.. get a hold of this data
  userDetails: Observable<userinfo[]>
  addThisUser: userinfo
  myDate = new Date().toISOString(); // date picker format
  user: firebase.User;
  //variable to be added as user information to be database
  brand: string
  CigarettesADay: number
  CigarettesPerBox: number
  CostOfBox: number
  YearsSmoking: number
  QuitDate: number

  //for deciding if user should update or add
  updateUser: number = 0;
  ngOnInit() {
    //console.log(this.user.email)
  }
  ionViewWillEnter() {
    this.userDetails = this.service.getUsers() //loads in users smoking habit information
    this.updateUser = 0
    this.userDetails.forEach(async element => {

      //loops through the collection of smoking habit details and finds the users details thats logged into the app 
      for (let index = 0; index < element.length; index++) {
        //add all of the previously entered 
        if (element[index].UserName == this.user.email) {
          this.addThisUser = element[index]
          this.brand = element[index].Brand
          this.CigarettesADay = element[index].CigarettesADay
          this.CigarettesPerBox = element[index].CigarettesPerBox
          this.CostOfBox = element[index].CostOfBox
          this.YearsSmoking = element[index].YearsSmoking
          this.QuitDate = element[index].QuitDate
          this.updateUser = 1 //user found
        }
      }
    })
  }

  addUser() {
    //if the user info previously stored has been found
    if (this.brand == null || this.brand == "" || this.CostOfBox == 0 || this.CigarettesADay == 0 || this.CigarettesPerBox == 0 || this.YearsSmoking == 0 || this.QuitDate == 0) {
      alert("all fields must be filled") //form validation
    }
    else {
      if (this.updateUser == 1) {
        this.addThisUser.Brand = this.brand
        this.addThisUser.CigarettesADay = this.CigarettesADay
        this.addThisUser.CigarettesPerBox = this.CigarettesPerBox
        this.addThisUser.CostOfBox = this.CostOfBox
        this.addThisUser.YearsSmoking = this.YearsSmoking
        this.addThisUser.QuitDate = this.QuitDate
        this.service.updateuser(this.addThisUser).then(() => {
          this.router.navigateByUrl('/financial-page');
          alert('Statistics updated');
        })
      }
      else //  no information added for that user. ( user needs to add their habit info)
      {
        this.addThisUser =
        {
          Brand: this.brand,
          CigarettesADay: this.CigarettesADay,
          CigarettesPerBox: this.CigarettesPerBox,
          CostOfBox: this.CostOfBox,
          YearsSmoking: this.YearsSmoking,
          UserName: this.user.email,
          QuitDate: this.QuitDate,
        }
        this.service.adduser(this.addThisUser).then(() => {
          this.router.navigateByUrl('/financial-page');
          console.log(this.addThisUser)
          alert('Statistics saved');
        });
      }
    }
  }
}

