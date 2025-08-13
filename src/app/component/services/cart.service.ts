import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = [];
  productsInCart: number=0;
 private baseUrl = 'http://localhost:3001/products'; // adjust if needed

  constructor(private http: HttpClient) {}

addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    const newQuantity = product.quantity - 1;
    if (newQuantity >= 0) {
      this.http.patch(`${this.baseUrl}/${product.id}`, { quantity: newQuantity })
        .subscribe(() => {
          console.log(`Product ${product.id} quantity updated to ${newQuantity}`);
        }, (error) => {
          console.error('Failed to update product quantity', error);
        });
    } else {
      console.warn('Product is out of stock');
    }

    console.log('Cart Items:', this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
 updateProductStock(id: number, newQuantity: number) {
    return this.http.patch(`${this.baseUrl}/${id}`, { quantity: newQuantity }).subscribe({
      next: () => console.log(`Updated product ${id} quantity to ${newQuantity}`),
      error: err => console.error('Error updating product stock', err)
    });
  }
  getProductById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  clearCart() {
    this.cartItems = [];
    this.productsInCart=0;
  }
}
