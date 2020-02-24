import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.page.html',
  styleUrls: ['./facts.page.scss'],
})
export class FactsPage implements OnInit {

  constructor(private iab: InAppBrowser) {

   }

   openF1() {
     this.iab.create("https://www2.hse.ie/wellbeing/quit-smoking/reasons-to-quit-smoking/smoking-facts-and-figures.html", "_blank");
   }

   openF2(){
     this.iab.create("https://www.hse.ie/eng/about/who/tobaccocontrol/kf/", "_blank");
   }

   openF3(){
     this.iab.create("https://www.hse.ie/eng/about/who/tobaccocontrol/smoking-and-mental-health/", "_blank");
   }

   openF4() {
     this.iab.create("https://www.hse.ie/eng/about/who/tobaccocontrol/smoking-and-pregnancy/", "_blank");
   }

  ngOnInit() {
  }

}
