import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router'; // Import RouterModule to enable routing

@Component({
  selector: 'app-dashboard', // Selector for this component
  standalone: true, // Indicates this is a standalone component
  imports: [
    MatToolbarModule,  // Import for toolbar functionality
    MatButtonModule,  // Import for button components
    MatIconModule,  // Import for icon usage
    MatSidenavModule,  // Import for side navigation
    RouterModule  // RouterModule is required for routing (router-outlet)
  ],
  templateUrl: './dashboard.component.html',  // Template for the dashboard component
  styleUrls: ['./dashboard.component.css']  // Associated styles for the dashboard component
})
export class DashboardComponent {} // Main dashboard component class
