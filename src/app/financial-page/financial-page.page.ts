import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financial-page',
  templateUrl: './financial-page.page.html',
  styleUrls: ['./financial-page.page.scss'],
})
export class FinancialPagePage implements OnInit {
  
  myDate = new Date().toISOString();

  constructor() { }

  dateChanged(date){
    console.log(date.detail.value);
    console.log(this.myDate);
  }

  ngOnInit() {
  }

}
