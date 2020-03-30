import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-chatforum',
  templateUrl: './chatforum.page.html',
  styleUrls: ['./chatforum.page.scss'],
})
export class ChatforumPage implements OnInit {

  messages = [
    {
      user: 'James',
      createdAt: 3232342141,
      msg: 'im good now , yourself ?'

    },
    {
      user: 'Mike',
      createdAt: 54321234,
      msg: 'Hey how are you?'

    },
    {
      user: 'Mike',
      createdAt: 5432343,
      msg: 'Not too bad now'

    },
  ];

  currentUser = 'James';
  newMsg = '';
  //@ViewChild(IonContent) content:IonContent
  constructor() { }

  sendMessage(){
    this.messages.push({
      user: 'mike',
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });

    this.newMsg = '';
    setTimeout(() => {
    //this.content.scrollToBottom(200);
  });
}


  ngOnInit() {
  }

}
