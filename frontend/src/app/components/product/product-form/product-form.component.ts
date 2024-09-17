import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';  
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';  
import { MatCardModule } from '@angular/material/card';  

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, 
    MatCardModule,  
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: any = {
    Name: '',
    ProductNumber: '',
    MakeFlag: false,
    FinishedGoodsFlag: false,
    Color: '',
    SafetyStockLevel: 0,
    ReorderPoint: 0,
    StandardCost: 0,
    ListPrice: 0
  };

  productId: number | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve product ID from the route parameters, if available
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.productId = +idParam;
      // Load product data if ID exists
      this.productService.getProduct(this.productId).subscribe((data) => {
        this.product = data;

        // Format dates to "yyyy-MM-dd" before displaying in the form
        if (this.product.SellStartDate) {
          this.product.SellStartDate = this.formatDate(this.product.SellStartDate);
        }
        if (this.product.SellEndDate) {
          this.product.SellEndDate = this.formatDate(this.product.SellEndDate);
        }
        if (this.product.DiscontinuedDate) {
          this.product.DiscontinuedDate = this.formatDate(this.product.DiscontinuedDate);
        }
      });
    }
  }
  
  // Helper function to format dates to "yyyy-MM-dd"
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Return date in "yyyy-MM-dd" format
  }

  onSubmit(): void {
    // Update product if an ID exists, otherwise create a new one
    if (this.productId) {
      this.productService.updateProduct(this.productId, this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.createProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  // Navigate back to the product list
  goBack(): void {
    this.router.navigate(['/products']);
  }
}
