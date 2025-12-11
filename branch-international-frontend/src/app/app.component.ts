import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   isLoggedIn: boolean = false;

  constructor(private router: Router) {
    // Listen for route changes to update login status
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = !!localStorage.getItem('agentName') && this.router.url !== '/login';
      }
    });
  }
}
