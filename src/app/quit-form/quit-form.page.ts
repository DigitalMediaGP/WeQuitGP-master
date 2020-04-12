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
  constructor(private service:JournalService, public afAuth: AngularFireAuth, private router: Router) {
    //get a hold of the user in the app
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }
  //load in the details for the user.. get a hold of this data
  userDetails:Observable<userinfo[]>
  addThisUser:userinfo
  myDate = new Date().toISOString(); // date picker format
  user: firebase.User;
  //variable to be added as user information to be database
  brand:string
  CigarettesADay:number
  CigarettesPerBox:number
  CostOfBox:number
  YearsSmoking:number
  QuitDate:number
  //for deciding if user should update or add
  updateUser:number = 0;
  ngOnInit() { 
    //console.log(this.user.email)
  }
  ionViewWillEnter(){
    this.userDetails = this.service.getUsers()
    this.updateUser = 0 
    this.userDetails.forEach(async element => {
      console.log(element)
      for (let index = 0; index < element.length; index++) {
        //add all of the previously entered 
        if(element[index].UserName == this.user.email)
        {
          this.addThisUser = element[index]
          //console.log(this.addThisUser)
          //this.addThisUser.id = element[index].id
          this.brand = element[index].Brand
          this.CigarettesADay = element[index].CigarettesADay
          this.CigarettesPerBox = element[index].CigarettesPerBox
          this.CostOfBox = element[index].CostOfBox
          this.YearsSmoking = element[index].YearsSmoking
          this.QuitDate = element[index].QuitDate
          //if found then add user becomes update
          console.log('User found!')
          this.updateUser = 1
        }
      }
    })
  }
  //when the button is
  addUser(){
    //if the user info previously stored has been found
    if(this.brand==null || this.brand == "" || this.CostOfBox == 0 || this.CigarettesADay == 0 || this.CigarettesPerBox == 0 || this.YearsSmoking == 0 || this.QuitDate == 0)
    {
      alert("all fields must be filled")
    }
    else 
    {
      if(this.updateUser == 1)
      {
        this.addThisUser.Brand = this.brand
        this.addThisUser.CigarettesADay = this.CigarettesADay
        this.addThisUser.CigarettesPerBox = this.CigarettesPerBox
        this.addThisUser.CostOfBox = this.CostOfBox
        this.addThisUser.YearsSmoking = this.YearsSmoking
        this.addThisUser.QuitDate = this.QuitDate
        this.service.updateuser(this.addThisUser).then(() => {
          this.router.navigateByUrl('/financial-page');
          alert('Statistics updated');
          console.log(this.addThisUser)
          //this.updateUser=0
        })
        //reset check for updating a user
      }
      else//no user found
      {
        //add user - first time adding user
        //build user object for database  
        this.addThisUser =
        {
          Brand:this.brand,
          CigarettesADay: this.CigarettesADay,
          CigarettesPerBox: this.CigarettesPerBox,
          CostOfBox: this.CostOfBox,
          YearsSmoking: this.YearsSmoking,
          UserName:this.user.email,
          QuitDate:this.QuitDate,  
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

