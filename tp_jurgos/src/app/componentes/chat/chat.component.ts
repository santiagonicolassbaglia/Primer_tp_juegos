import { Component, OnInit } from '@angular/core';
import { ChatMessage, ChatService } from '../../services/chat.service';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [DatePipe]
})
export class ChatComponent implements OnInit {

  messages: ChatMessage[] = [];
  user: string = '';
  newMessage: string = '';

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUserName().subscribe(userName => {
      this.user = userName || 'Usuario Anónimo';
    });

    this.chatService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const user = this.user;
      const timestamp = new Date();
      this.chatService.sendMessage(user, this.newMessage, timestamp).then(() => {
        this.newMessage = '';
      });
    }
  }

  borrarMensajes(): void {
    if (confirm('¿Estás seguro de que quieres borrar todos los mensajes?')) {
      this.chatService.borrarTodosLosMensajes().then(() => {
        this.messages = [];
      }).catch(error => {
        console.error('Error al borrar mensajes del servidor:', error);
      });
    }
  }
}
