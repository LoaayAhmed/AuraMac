import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

Home: any;
isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

 searchQuery: string = '';

  constructor(private router: Router,public cartService:CartService) {}
numberofItems: number=this.cartService.productsInCart;

  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();

    if (query === 'iphone') {
      this.router.navigate(['/iphone']); 
    }
    else if (query === 'ipad') {
      this.router.navigate(['/ipad']); 
    }
    else if (query === 'mac') {
      this.router.navigate(['/mac']); 
    }
    
    else {
      alert('Product not found!');
    }
  }

  
}


