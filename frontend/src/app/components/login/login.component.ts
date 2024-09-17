import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // Method triggered when the form is submitted
  onSubmit() {
    const credentials = { username: this.username, password: this.password };

    // Sending login credentials to the backend API
    this.http.post('http://localhost:3000/api/auth/login', credentials).subscribe(
      (response: any) => {
        console.log('Login successful', response);

        // Save authentication status in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Redirect to the dashboard after successful login
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
