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
  private userDetails:Observable<userinfo[]>;
  private addThisUser:userinfo
  user: firebase.User;
  //variable to be added as user information to be database
  brand:string
  CigarettesADay:number
  CigarettesPerBox:number
  CostOfBox:number
  YearsSmoking:number
  //for deciding if user should update or add
  updateUser:number
  ngOnInit() { 
    this.userDetails = this.service.getUsers()
    console.log(this.userDetails)
  }
  ionViewWillEnter(){
    this.updateUser = 0
    this.userDetails.forEach(element => {
      console.log(element)
      for (let index = 0; index < element.length; index++) {
        //add all of the previously entered 
        if(element[index].UserName==this.user.email)
        {
          this.addThisUser = element[index]
          console.log(this.addThisUser)
          //this.addThisUser.id = element[index].id
          this.brand = element[index].Brand
          this.CigarettesADay = element[index].CigarettesADay
          this.CigarettesPerBox = element[index].CigarettesPerBox
          this.CostOfBox = element[index].CostOfBox
          this.YearsSmoking = element[index].YearsSmoking
          //if found then add user becomes update
          console.log('User found!')
          this.updateUser = 1
        }         
      }
    })
  }
  addUser(){
    //if the user info previously stored has been found
    if(this.updateUser == 1)
    {
      this.addThisUser.Brand = this.brand
      this.addThisUser.CigarettesADay = this.CigarettesADay
      this.addThisUser.CigarettesPerBox = this.CigarettesPerBox
      this.addThisUser.CostOfBox = this.CostOfBox
      this.addThisUser.YearsSmoking = this.YearsSmoking
      console.log(this.addThisUser)
      this.service.updateuser(this.addThisUser).then(() => {
        this.router.navigateByUrl('/home');
        alert('Statistics updated');
      })
      //reset check for updating a user
      this.updateUser=0
    }
    else
    {
      //add user - first time adding user
      //build user object for database
      this.addThisUser =
      {
        Brand:this.brand,
        CigarettesADay: this.CigarettesADay,
        CigarettesPerBox: this.CigarettesADay,
        CostOfBox: this.CostOfBox,
        YearsSmoking: this.YearsSmoking,
        UserName:this.user.email
      }
      this.service.adduser(this.addThisUser).then(() => {
        this.router.navigateByUrl('/home');
        alert('Statistics updated');
      });
    } 
   //to be finished - form validation
   //if any of the form hasn't been filled out.. don't do anything and alert the user
   //if(this.brand == "" || this.CigarettesADay == null || this.CigarettesPerBox == null || this.CostOfBox == null || this.YearsSmoking==null)
   //{
   //alert("please fill in all details")
   //}
   //else
   //{
   //add the user here
   //}
  }
}
