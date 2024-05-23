// chat.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

export interface ChatMessage {
  message: string;
  userEmail: string;
  recipientEmail: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesCollection: AngularFirestoreCollection<ChatMessage>;

  constructor(private firestore: AngularFirestore) {
    this.messagesCollection = firestore.collection<ChatMessage>('messages', ref => ref.orderBy('timestamp', 'asc'));
  }

  getMessages(): Observable<ChatMessage[]> {
    return this.messagesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ChatMessage;
        const timestamp = data.timestamp as unknown as firebase.firestore.Timestamp;
        return {
          ...data,
          timestamp: timestamp.toDate()
        };
      }))
    );
  }

  sendMessage(message: string, recipientEmail: string): Promise<void> {
    const userEmail = firebase.auth().currentUser?.email;
    if (!userEmail) {
      return Promise.reject('User not logged in');
    }
    const newMessage: ChatMessage = {
      message,
      userEmail,
      recipientEmail,
      timestamp: new Date()
    };
    return this.messagesCollection.add(newMessage).then(() => {});
  }
}
