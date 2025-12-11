import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerMessage } from '../models/CustomerMessage';
import { MessageResponse } from '../models/MessageResponse';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8081/messages';

  constructor(private http: HttpClient) { }

  getRespondedMessages(): Observable<CustomerMessage[]> {
    return this.http.get<CustomerMessage[]>(`${this.baseUrl}/responded`);
  }

  getMessageById(id: number): Observable<CustomerMessage> {
    return this.http.get<CustomerMessage>(`${this.baseUrl}/getById/${id}`);
  }

  getPendingMessages(): Observable<CustomerMessage[]> {
    return this.http.get<CustomerMessage[]>(`${this.baseUrl}/pending`);
  }

  respondToMessage(response: MessageResponse): Observable<any> {
    return this.http.post(`${this.baseUrl}/respond`, response , {responseType: 'text'});
  }

  getCustomerInfo(userId:number){
    return this.http.get(`${this.baseUrl}/customer-info/${userId}`);
  }
}
