import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private baseUrl = 'http://localhost:8081/agents';

  constructor(private http: HttpClient) { }

  // Login agent
  login(agent: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`,agent, { responseType: 'text' });
  }

}
