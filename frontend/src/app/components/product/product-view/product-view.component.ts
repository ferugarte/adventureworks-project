import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule  // Import RouterModule to enable routerLink
  ],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
  product: any;  // Holds product details

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    // Retrieve product ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Fetch product details from the ProductService using the ID
      this.productService.getProduct(+id).subscribe(
        product => this.product = product,  // Assign product data to the component's property
        error => console.error(error)  // Log error if product retrieval fails
      );
    }
  }
}
