import { Component } from '@angular/core';
import { CustomerMessage } from '../models/CustomerMessage';
import { MessageService } from '../services/message.service';
import { MessageStreamService } from '../services/message-stream.service';
import { CannedResponsesService } from '../services/canned-responses.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: CustomerMessage[] = [];
  selectedUser: any = null;
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
  ) { }

  ngOnInit(): void {
    this.loadPendingMessages();
    this.cannedService.getResponses().subscribe(data => this.cannedResponses = data);

    this.messageStream.stream().subscribe(msg => {
      console.log("New message received:", msg);
      this.messages.push(msg);
      this.filteredMessages = [...this.messages];
    });
  }

  openRespondModal(message: CustomerMessage) {
    this.selectedMessage = message;
    this.responseText = "";

    const modalEl = document.getElementById('respondModal');

    if (modalEl) {
      this.respondModal = new bootstrap.Modal(modalEl);
      this.respondModal.show();
    }
  }

  insertCanned(event: any) {
    const text = event.target.value;
    if (text) {
      this.responseText = text; // overwrite or append
    }
  }

  sendResponse() {
    if (!this.selectedMessage) return;

    const payload = {
      messageId: this.selectedMessage.id,
      agentName: localStorage.getItem('agentName'),
      responseText: this.responseText
    };

    this.messageService.respondToMessage(payload).subscribe(() => {
      this.respondModal.hide();
      this.loadPendingMessages();
    });
  }

  loadPendingMessages() {
    this.messageService.getPendingMessages().subscribe(data => {
      this.messages = data;
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

  getUserDetails(id: number) {
    this.selectedUser = null; // reset previous data
    this.messageService.getCustomerInfo(id).subscribe(
      (response) => {
        this.selectedUser = response;
        console.log(this.selectedUser);

        // Show the modal using Bootstrap JS
        const modalElement = document.getElementById('userDetailsModal');
        if (modalElement) {  // <-- check for null
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        } else {
          console.error('Modal element not found!');
        }
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

}
