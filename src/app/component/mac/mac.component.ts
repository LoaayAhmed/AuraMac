import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-mac',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './mac.component.html',
  styleUrls: ['./mac.component.css']
})
export class MacComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.searchByCategory('Mac').subscribe((data) => {
      this.products = data;
    });
  }
}
