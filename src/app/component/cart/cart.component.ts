import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    
  }

 increaseQuantity(item: any) {
  this.cartService.getProductById(item.id).subscribe((productFromDb) => {
    if (productFromDb.quantity > 0) {
      item.quantity++;
      const newStockQuantity = productFromDb.quantity - 1;
      this.cartService.updateProductStock(item.id, newStockQuantity);
    } else {
      alert('This product is out of stock.');
    }
  });
}

decreaseQuantity(item: any) {
  if (item.quantity > 1) {
    item.quantity--;

    // Get current stock and increase it
    this.cartService.getProductById(item.id).subscribe((productFromDb) => {
      const newStockQuantity = productFromDb.quantity + 1;
      this.cartService.updateProductStock(item.id, newStockQuantity);
    });

  } else {
    this.removeItem(item);
  }
}

removeItem(item: any) {
  const index = this.cartItems.findIndex(i => i.id === item.id);
  if (index !== -1) {
    const removed = this.cartItems.splice(index, 1)[0];

    // restore quantity to db when removing item completely
    this.cartService.getProductById(item.id).subscribe((productFromDb) => {
      const newStockQuantity = productFromDb.quantity + removed.quantity;
      this.cartService.updateProductStock(item.id, newStockQuantity);
    });
  }
}


  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}
