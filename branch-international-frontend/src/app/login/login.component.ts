import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  agentName: string = '';
  password: string = '';
  error: string = '';

  constructor(private agentService: AgentService, private router: Router) { }

  login() {
    if (!this.agentName.trim()) {
      this.error = 'Agent name is required';
      return;
    }

    const payload = {
      agentName : this.agentName,
      password : this.password
    }

    this.agentService.login(payload).subscribe({
      next: (res) => {
        console.log(res);
        if(res === 'login failed'){
          this.error = res;
          return;
        }
        localStorage.setItem('agentName', this.agentName.trim());
        this.router.navigate(['/messages']);
      },
      error: (err) => this.error = err.message
    });
  }
}
