import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CannedResponsesService {
  constructor(private http: HttpClient) {}

  getResponses() {
    return this.http.get<any[]>('/assets/canned-responses.json');
  }
}
