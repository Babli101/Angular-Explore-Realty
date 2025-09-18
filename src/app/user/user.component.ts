// user-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UserNavbarComponent } from './user-navbar.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, RouterLink, UserNavbarComponent],
  template: `
    <app-user-navbar></app-user-navbar>
    <router-outlet></router-outlet>
  `
})
export class UserComponent {}
