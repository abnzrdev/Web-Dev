import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product.model';
import { ProductCard } from '../product-card/product-card';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList {
  @Input() products: Product[] = [];

  constructor(private svc: ProductService) {}

  trackById(index: number, item: Product) {
    return item.id;
  }

  onDelete(productId: number) {
    // remove from service (persistent) and update local list
    this.svc.deleteProduct(productId);
    this.products = this.products.filter((p) => p.id !== productId);
  }
}
