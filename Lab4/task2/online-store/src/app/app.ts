import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductList } from './product-list/product-list';
import { ProductService } from './product.service';
import { Category } from './category.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductList],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  selectedProducts: any[] = [];

  constructor(private svc: ProductService) {
    this.categories = this.svc.getCategories();
    if (this.categories && this.categories.length) {
      this.selectCategory(this.categories[0].id);
    }
  }

  selectCategory(id: number) {
    if (this.selectedCategoryId === id) return;
    this.selectedCategoryId = id;
    this.selectedProducts = this.svc.getProductsByCategory(id);
  }

  isSelected(id: number) {
    return this.selectedCategoryId === id;
  }
}
