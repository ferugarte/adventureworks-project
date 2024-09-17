import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  // Import the RouterOutlet for handling route navigation
  templateUrl: './app.component.html',  // Template that displays the routed components
  styleUrls: ['./app.component.css']  // Styling for the main application component
})
export class AppComponent {
  title = 'frontend';  // Title of the application (can be used in the template)
}
