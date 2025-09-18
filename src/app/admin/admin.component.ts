// admin-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AdminNavbarComponent } from './admin-navbar.component'; 
import { SideNavbarComponent } from './side-navbar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AdminNavbarComponent,SideNavbarComponent],
  template: `
    <div class="admin-wrapper d-flex">
  <!-- Sidebar -->
  <app-side-navbar></app-side-navbar>

  <div class="admin-main flex-grow-1">
    <!-- Top Navbar -->
    <app-admin-navbar></app-admin-navbar>

    <!-- Child content -->
    <div class="admin-content p-3">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
  `
})
export class AdminComponent {}
