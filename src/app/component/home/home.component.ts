import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Category {
  name: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  categories: Category[] = [
    { name: 'MacBooks', icon: '💻', count: 45 },
    { name: 'iPhones', icon: '📱', count: 38 },
    { name: 'iPads', icon: '📱', count: 25 }
  ];

  featuredProducts: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro 16" M3 Max',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
      category: 'MacBooks'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      price: 999,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      category: 'iPhones'
    },
    {
      id: 3,
      name: 'iPad Pro 12.9"',
      price: 799,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      category: 'iPads'
    }
  ];

  onCategoryClick(category: Category): void {
    if (category.name === 'MacBooks') {
      this.router.navigate(['/mac']);
    } else if (category.name === 'iPhones') {
      this.router.navigate(['/iphone']);
    } else if (category.name === 'iPads') {
      this.router.navigate(['/ipad']);
    }
  }

  onProductClick(product: Product): void {
    this.router.navigate(['/product', product.id]);
  }

  onAddToCart(product: Product): void {
    // تقدر هنا تضيف cartService وتشغل الإضافة فعليًا
    alert(`${product.name} added to cart!`);
  }

  onQuickView(product: Product): void {
    this.router.navigate(['/product', product.id]);
  }

  onSubscribeNewsletter(email: string): void {
    console.log('Subscribe email:', email);
    // logic for subscription
  }

  onShopNow(): void {
    this.router.navigate(['/product']);
  }
}
