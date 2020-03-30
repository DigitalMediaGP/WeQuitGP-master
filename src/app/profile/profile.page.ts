import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {



   QuitForm = this.formBuilder.group({
    Brand:[''],
    CigarettesADay:[''],
    CigarettesPerBox:[''],
    CostOfBox:[''],
    YearsSmoking:[''],

 
   });

  constructor(private formBuilder: FormBuilder ,public afAuth: AngularFireAuth) { }



  ngOnInit() {
  }
  public submit(){
    console.log(this.QuitForm.value);
  }
}
