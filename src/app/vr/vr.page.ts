import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-vr',
  templateUrl: './vr.page.html',
  styleUrls: ['./vr.page.scss'],
})
export class VRPage implements OnInit {

  constructor(private iab: InAppBrowser) {

    

   }

   openF1() {
    this.iab.create("http://wequit.xyz/", "_blank");
  }

  ngOnInit() {
  }

}
