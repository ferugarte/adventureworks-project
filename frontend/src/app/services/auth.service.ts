import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient to make HTTP requests
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Import environment to access baseUrl

@Injectable({
  providedIn: 'root'  // Makes this service available throughout the app
})
export class AuthService {

  private baseUrl = environment.baseUrl;  // Base URL for the API, set in the environment file
  private loginEndpoint = '/api/auth/login';  // Specific endpoint for the login request

  constructor(private http: HttpClient) { }

  // Method to handle user login by making an HTTP POST request
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.loginEndpoint}`, { username, password });  // Combines baseUrl and endpoint
  }

  // Method to store the login status in localStorage
  setLoginStatus(status: boolean): void {
    localStorage.setItem('isLoggedIn', status ? 'true' : 'false');  // Stores the login status as a string
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';  // Returns true if 'isLoggedIn' is set to 'true'
  }

  // Method to log the user out by removing login status from localStorage
  logout(): void {
    localStorage.removeItem('isLoggedIn');  // Clears the login status from localStorage
  }
}
