import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { CustomerMessage } from '../models/CustomerMessage';
import { MessageStreamService } from '../services/message-stream.service';
import { CannedResponsesService } from '../services/canned-responses.service';

@Component({
  selector: 'app-replied-messages',
  templateUrl: './replied-messages.component.html',
  styleUrls: ['./replied-messages.component.css']
})
export class RepliedMessagesComponent implements OnInit{
  messages: CustomerMessage[] = [];
  filteredMessages: CustomerMessage[] = [];
  searchTerm = '';
  cannedResponses: any[] = [];

  selectedMessage!: CustomerMessage | null;
  responseText: string = '';

  private respondModal: any;

  constructor(
    private messageService: MessageService,
    private messageStream: MessageStreamService,
    private cannedService: CannedResponsesService
  ) {}

  ngOnInit(): void {
    this.loadRespondedMessages();
    this.cannedService.getResponses().subscribe(data => this.cannedResponses = data);

    this.messageStream.stream().subscribe(msg => {
      if (!this.messages.some(m => m.id === msg.id)) {
        this.messages.push(msg);
        this.filteredMessages = [...this.messages];
      }
    });
  }

  loadRespondedMessages() {
    this.messageService.getRespondedMessages().subscribe(data => {
      this.messages = data;
      console.log(this.messages);
      this.filteredMessages = [...data];
    });
  }

  filterMessages() {
    const term = this.searchTerm.toLowerCase();
    this.filteredMessages = this.messages.filter(msg =>
      msg.userId.toString().includes(term) ||
      msg.messageBody.toLowerCase().includes(term)
    );
  }
}
