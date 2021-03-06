import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ChatService } from '../services/chat.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-chatforum',
  templateUrl: './chatforum.page.html',
  styleUrls: ['./chatforum.page.scss'],
})
export class ChatforumPage implements OnInit {

  //Variables 
  messages = []; // Messages 
  newMsg: string
  currentUser: string

  constructor(private webchatclient: ChatService, private user: AngularFireAuth) { }

  ngOnInit() {
    this.messages = this.webchatclient.getConvo(); //
    this.currentUser = this.user.auth.currentUser.email //current user signed in.
  }
  sendMessage() { //calls the chat service method to send message.
    console.log(this.user.auth.currentUser.email)
    this.webchatclient.sendMessage(this.currentUser, this.newMsg);
    this.newMsg = "";
  }
}
