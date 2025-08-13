import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: number = 0;
  product: any = {
    title: '',
    category: '',
    price: 0,
    quantity: 0,
    description: '',
    imageUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getById(this.productId).subscribe((data) => {
      this.product = data;
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.productId, this.product).subscribe(() => {
      alert('Product updated successfully!');
      this.router.navigate(['/product']);
    });
  }
}
