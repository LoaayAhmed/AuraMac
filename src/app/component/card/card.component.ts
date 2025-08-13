import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() product: any;
  @Output() onDelete = new EventEmitter<number>(); // 🆕 EventEmitter لإرسال ID عند الحذف

  constructor(private cartService: CartService,private productservice: ProductService) {}

 addToCart() {
  if (this.product.quantity === 0) {
    alert(`${this.product.title} is out of stock!`);
    return; // stop here
  }

  this.cartService.addToCart(this.product);
  alert(`${this.product.title} added to cart!`);
}


  deleteProduct() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.onDelete.emit(this.product.id);
    }
    this.productservice.deleteProduct(this.product.id).subscribe({
      next: () => {
        alert('Product deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        alert('Failed to delete product. Please try again later.');
      }
    });
  }
}
