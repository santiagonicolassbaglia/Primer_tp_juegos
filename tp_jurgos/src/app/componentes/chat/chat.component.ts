import { Component, OnInit } from '@angular/core';
import { ChatMessage, ChatService } from '../../services/chat.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{

  messages: ChatMessage[] = [];
  newMessage: string = '';
  recipientEmail: string = '';
  user: string | null = '';

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user.email;
        this.chatService.getMessages().subscribe(messages => {
          this.messages = messages;
        });
      }
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '' && this.recipientEmail.trim() !== '') {
      this.chatService.sendMessage(this.newMessage, this.recipientEmail).then(() => {
        this.newMessage = '';
        this.recipientEmail = '';
      });
    }
  }

}
