import { Injectable } from '@angular/core';
import { WEBSERVERLOCATION, CONVERSATION, WebChatConnection } from 'finalwebchatclientjson';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private conversation = CONVERSATION

  constructor(private ws: WebChatConnection) {
    this.ws.chatServer_init(WEBSERVERLOCATION, 'kJr1yVADuxRl2IpEOocXdH');
  }

  sendMessage(name: string, message: string) //
  {
    this.ws.sendMessage(name, message) //message to sent to uther users.
  }

  getConvo(): JSON[] //where all user messages are sent
  {
    return this.conversation;
  }
}
