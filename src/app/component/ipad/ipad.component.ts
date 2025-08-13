import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-ipad',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './ipad.component.html',
  styleUrls: ['./ipad.component.css']
})
export class IpadComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.searchByCategory('iPad').subscribe((data) => {
      this.products = data;
    });
  }
}
