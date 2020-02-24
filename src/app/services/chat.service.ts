import { Injectable } from '@angular/core';
import {WEBSERVERLOCATION, CONVERSATION, WebChatConnection} from 'finalwebchatclientjson';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private conversation = CONVERSATION

  constructor(private ws:WebChatConnection) 
  {
    this.ws.chatServer_init(WEBSERVERLOCATION,'GOebgXvm6Bo23ck1');
  }

  sendMessage(name:string,message:string)
  {
   this.ws.sendMessage(name,message)
  }

  getConvo():JSON[]
  {
    return this.conversation;
  }
}
