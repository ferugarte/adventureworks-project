import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Import environment file for configuration

@Injectable({
  providedIn: 'root'  // Provides the service across the entire app
})
export class ProductService {
  private baseUrl = environment.baseUrl;  // Uses baseUrl from environment configuration

  constructor(private http: HttpClient) {}

  // Fetches all products from the API
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/products`);  // Concatenates baseUrl with the specific endpoint
  }

  // Fetches a single product by its ID
  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/products/${id}`);
  }

  // Sends a request to create a new product
  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/products`, product);
  }

  // Sends a request to update an existing product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/products/${id}`, product);
  }

  // Sends a request to delete a product by its ID
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/products/${id}`);
  }
}
