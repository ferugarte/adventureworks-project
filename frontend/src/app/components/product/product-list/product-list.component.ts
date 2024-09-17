import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';  // Import MatTableDataSource for the table
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';  // For button icons
import { RouterModule } from '@angular/router';  // Ensure RouterModule is imported
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';  // For pagination
import { MatSort, MatSortModule } from '@angular/material/sort';  // Optional: For sorting
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,  // For common Angular directives like *ngFor
    MatTableModule,  // For table functionality
    MatButtonModule,  // For buttons
    MatIconModule,  // For icons
    RouterModule,  // For routerLink usage
    MatPaginatorModule,  // For pagination
    MatSortModule  // Optional: For sorting functionality
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['ProductID', 'Name', 'ProductNumber', 'actions'];  // Define table columns
  dataSource = new MatTableDataSource<Product>([]);  // Define dataSource for the table
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Pagination reference
  @ViewChild(MatSort) sort!: MatSort;  // Optional: Sorting reference

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is authenticated; if not, redirect to login
    if (!localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/login']);
      return;
    }

    // Fetch products from the service
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.dataSource.data = data;
        // Assign paginator and sort to the dataSource after loading data
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error retrieving products', error);
      }
    );
  }

  // Method to delete a product by ID
  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        response => {
          console.log('Product deleted:', response);
          // Remove the product from the local dataSource after deletion
          this.dataSource.data = this.dataSource.data.filter(product => product.ProductID !== productId);
        },
        error => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
