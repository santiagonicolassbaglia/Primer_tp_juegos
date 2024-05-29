import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ChatMessage {
  id?: string;
  user: string;
  message: string;
  timestamp: any; // Cambiar a 'any' para manejar Timestamps de Firestore
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messagesCollection: AngularFirestoreCollection<ChatMessage>;

  constructor(private firestore: AngularFirestore) {
    this.messagesCollection = firestore.collection<ChatMessage>('messages', ref => ref.orderBy('timestamp', 'asc'));
  }

  borrarTodosLosMensajes(): Promise<void> {
    return this.firestore.collection('messages').get().toPromise().then(snapshot => {
      const batch = this.firestore.firestore.batch();
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      return batch.commit();
    });
  }
  
  getMessages(): Observable<ChatMessage[]> {
    return this.messagesCollection.valueChanges().pipe(
      map(messages => messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp ? msg.timestamp.toDate() : null
      })))
    );
  }

  sendMessage(user: string, message: string, timestamp: Date): Promise<void> {
    const id = this.firestore.createId();
    return this.messagesCollection.doc(id).set({ id, user, message, timestamp: timestamp });
  }

  getNonEmptyUserNames(): Observable<string[]> {
    return this.firestore.collection<ChatMessage>('messages').valueChanges().pipe(
      map(messages => messages.filter(message => message.message.trim() !== '')),
      map(messages => messages.map(message => message.user)),
      map(users => users.filter((user, index, users) => users.indexOf(user) === index))
    );
  }

  getMessagesByUser(user: string): Observable<ChatMessage[]> {
    return this.firestore.collection<ChatMessage>('messages', ref => ref.where('user', '==', user)).valueChanges().pipe(
      map(messages => messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp ? msg.timestamp.toDate() : null
      })))
    );
  }
}
