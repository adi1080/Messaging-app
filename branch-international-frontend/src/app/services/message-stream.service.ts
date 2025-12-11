import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageStreamService {

  constructor(){}

  stream(): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource('http://localhost:8081/messages/stream');

      eventSource.addEventListener('new-message', (event: any) => {
        observer.next(JSON.parse(event.data));
      });

      return () => eventSource.close();
    });
  }
}
