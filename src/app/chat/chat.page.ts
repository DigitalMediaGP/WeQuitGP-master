import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AngularFireAuth } from '@angular/fire/auth'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  private jsonConversation;
  public message;
  constructor(private webchatclient:ChatService, private user:AngularFireAuth) { }

  ngOnInit() {
    this.jsonConversation = this.webchatclient.getConvo();
  }

  send()
  {
    this.webchatclient.sendMessage(this.user.auth.currentUser.email,this.message);
    this.message = "";
    //console.log(this.user.auth.currentUser);
  }

}
