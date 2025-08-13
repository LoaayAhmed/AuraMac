import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
product: any = {
  title: '',
  category: '',
  price: 0,
  quantity: 0,
  description: '',
  imageUrl: ''
};


  constructor(private productService: ProductService, private router: Router) {}

  addProduct() {
    this.productService.addProduct(this.product).subscribe(() => {
      alert('Product added successfully!');
      this.router.navigate(['/product']);
    });
  }
}
