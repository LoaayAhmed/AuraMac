import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-iphone',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.css']
})
export class IphoneComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.searchByCategory('iPhone').subscribe((data) => {
      this.products = data;
    });
  }
}
