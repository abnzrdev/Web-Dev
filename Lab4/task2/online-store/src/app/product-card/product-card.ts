import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCard {
  @Input() product!: Product;
  @Output() delete = new EventEmitter<number>();

  like() {
    if (this.product) this.product.likes = (this.product.likes || 0) + 1;
  }

  deleteItem() {
    if (this.product) this.delete.emit(this.product.id);
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img && img.src.indexOf('placeholder.com') === -1) {
      img.src = 'https://via.placeholder.com/400x300?text=No+Image';
    }
  }

  getWhatsAppLink() {
    const text = `Check out this product: ${this.product.link}`;
    return 'https://wa.me/?text=' + encodeURIComponent(text);
  }

  getTelegramLink() {
    const url = encodeURIComponent(this.product.link);
    const text = encodeURIComponent(this.product.name);
    return `https://t.me/share/url?url=${url}&text=${text}`;
  }
}
