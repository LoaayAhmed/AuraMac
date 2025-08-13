import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../services/cart.service';

export interface Product {
  id: number;
  title: string;
  imageUrl?: string;
  category?: string;
  description?: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService,public cartService:CartService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Product ID from route:', id); // Debug the ID
    if (id) {
      this.productService.getById(Number(id)).subscribe({
        next: (data) => {
          console.log('Raw data from service:', data); // Log the raw data
          if (data) {
            this.product = data as Product; // Explicit cast for type safety
            console.log('Assigned product:', this.product); // Confirm assignment
          } else {
            console.log('No data received from service');
          }
        },
        error: (err) => {
          this.error = `Product with ID ${id} not found or server error occurred.`;
          console.error('Error fetching product:', err);
        },
      });
    } else {
      this.error = 'Invalid product ID';
    }
  }
    addToCart() {
    this.cartService.addToCart(this.product);
    alert(`${this.product?.title} added to cart!`);
  }
}