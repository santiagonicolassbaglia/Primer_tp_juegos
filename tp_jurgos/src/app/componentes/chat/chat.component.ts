import { Component, OnInit } from '@angular/core';
import { ChatMessage, ChatService } from '../../services/chat.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  providers: [DatePipe]
})
export class ChatComponent implements OnInit{

  messages: ChatMessage[] = [];
  user: string = '';
  newMessage: string = '';
  tiempo = new Date().getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + '  ' ;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    var mensajesVacios = this.chatService.getNonEmptyUserNames().subscribe(users => {
      console.log('Usuarios con mensajes no vacíos:', users);
      
      if (mensajesVacios != null )
      {
        mensajesVacios.remove(mensajesVacios);

       
      }
       

      users.forEach(user => {
        this.chatService.getMessagesByUser(user).subscribe(messages => {
          console.log('Mensajes de', user, ':', messages);
        });
      });


    });

 
    // this.authService.getCurrentUserName().subscribe(userName => {
    //   this.user = userName || 'Usuario Anónimo';
    // });

if ( this.messages == null || this.messages.length == 0)
{
  console.log('No hay mensajes');
  this.messages = [];


}
 

    this.chatService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.authService.getCurrentUserName().subscribe(userName => {
        const user = userName || 'Usuario Anónimo';
        const timestamp = new Date();
        this.chatService.sendMessage(user, this.newMessage, timestamp).then(() => {
          this.newMessage = '';
        });
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
 
