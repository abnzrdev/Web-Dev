import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Category } from './category.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private categories: Category[] = [
    { id: 1, name: 'Smartphones' },
    { id: 2, name: 'Laptops' },
    { id: 3, name: 'Headphones' },
    { id: 4, name: 'Tablets' },
  ];

  private imagePool: string[] = [
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRGmD9TS35oPENNknHqWRxsQ2yN5r8Q1m_BPm8mHQehE7zZJzzV5yn6rg-h3Zk80BQIZEvlhVEN4oafvtnw2m5hO8DY2mM5sJlehnY4d0cNzKQfJ0RrdwLm9W9N7OKRlh5nMZYCYQA&usqp=CAc',
    'data:image/webp;base64,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'
  ];

  constructor() {
    // randomly assign images from the pool to all products
    this.products = this.products.map((p) => ({
      ...p,
      image: this.imagePool[Math.floor(Math.random() * this.imagePool.length)],
    }));
  }

  private products: Product[] = [
    // Smartphones (1..5)
    {
      id: 1,
      name: 'Apple iPhone 17 Pro 256GB',
      description: 'iPhone 17 Pro with improved camera and battery.',
      price: 749990,
      rating: 4.8,
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRGmD9TS35oPENNknHqWRxsQ2yN5r8Q1m_BPm8mHQehE7zZJzzV5yn6rg-h3Zk80BQIZEvlhVEN4oafvtnw2m5hO8DY2mM5sJlehnY4d0cNzKQfJ0RrdwLm9W9N7OKRlh5nMZYCYQA&usqp=CAc',
      images: [],
      link: 'https://kaspi.kz/shop/p/apple-iphone-17-pro-256gb-nanosim-esim-serebristyi-145467562/?c=750000000',
      likes: 0,
      categoryId: 1,
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra 512GB',
      description: 'Flagship Samsung smartphone with versatile camera.',
      price: 699990,
      rating: 4.6,
      image: 'data:image/webp;base64,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',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 1,
    },
    {
      id: 3,
      name: 'Xiaomi 14 Pro',
      description: 'High-end Xiaomi with great value and camera.',
      price: 419990,
      rating: 4.5,
      image: 'data:image/webp;base64,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',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 1,
    },
    {
      id: 4,
      name: 'Google Pixel 8 Pro',
      description: 'Pixel with excellent camera and pure Android.',
      price: 529990,
      rating: 4.4,
      image: 'https://source.unsplash.com/400x300/?google,pixel',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 1,
    },
    {
      id: 5,
      name: 'OnePlus 12',
      description: 'Fast performance and clean UI from OnePlus.',
      price: 359990,
      rating: 4.3,
      image: 'https://source.unsplash.com/400x300/?oneplus,phone',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 1,
    },

    // Laptops (6..10)
    {
      id: 6,
      name: 'Apple MacBook Pro 16-inch (M3) 1TB',
      description: 'MacBook Pro with M3 chip for creators.',
      price: 1199990,
      rating: 4.7,
      image: 'https://source.unsplash.com/400x300/?macbook,pro',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 2,
    },
    {
      id: 7,
      name: 'Dell XPS 15',
      description: 'Powerful Windows laptop with great display.',
      price: 899990,
      rating: 4.5,
      image: 'https://source.unsplash.com/400x300/?dell,laptop',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 2,
    },
    {
      id: 8,
      name: 'Lenovo ThinkPad X1 Carbon',
      description: 'Lightweight business laptop with robust build.',
      price: 649990,
      rating: 4.4,
      image: 'https://source.unsplash.com/400x300/?lenovo,laptop',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 2,
    },
    {
      id: 9,
      name: 'HP Spectre x360',
      description: 'Convertible laptop with touch display.',
      price: 579990,
      rating: 4.3,
      image: 'https://source.unsplash.com/400x300/?hp,laptop',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 2,
    },
    {
      id: 10,
      name: 'Asus ROG Strix G',
      description: 'Gaming laptop with high refresh rate display.',
      price: 749990,
      rating: 4.5,
      image: 'https://source.unsplash.com/400x300/?asus,gaming',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 2,
    },

    // Headphones (11..15)
    {
      id: 11,
      name: 'Sony WH-1000XM5',
      description: 'Top-tier noise-cancelling over-ear headphones.',
      price: 189990,
      rating: 4.7,
      image: 'https://source.unsplash.com/400x300/?headphones,sony',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 3,
    },
    {
      id: 12,
      name: 'Bose QuietComfort 45',
      description: 'Comfortable noise-cancelling headphones from Bose.',
      price: 159990,
      rating: 4.6,
      image: 'https://source.unsplash.com/400x300/?bose,headphones',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 3,
    },
    {
      id: 13,
      name: 'Apple AirPods Max',
      description: 'Premium over-ear headphones by Apple.',
      price: 239990,
      rating: 4.5,
      image: 'https://source.unsplash.com/400x300/?airpods,max',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 3,
    },
    {
      id: 14,
      name: 'Sennheiser Momentum 4',
      description: 'High-fidelity headphones with balanced sound.',
      price: 129990,
      rating: 4.4,
      image: 'https://source.unsplash.com/400x300/?sennheiser,headphones',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 3,
    },
    {
      id: 15,
      name: 'Jabra Elite 85h',
      description: 'Smart noise cancellation and long battery life.',
      price: 89990,
      rating: 4.2,
      image: 'https://source.unsplash.com/400x300/?jabra,headphones',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 3,
    },

    // Tablets (16..20)
    {
      id: 16,
      name: 'Apple iPad Pro 11-inch',
      description: 'Powerful tablet for creators and productivity.',
      price: 549990,
      rating: 4.8,
      image: 'https://source.unsplash.com/400x300/?ipad,apple',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 4,
    },
    {
      id: 17,
      name: 'Samsung Galaxy Tab S9',
      description: 'Android tablet with AMOLED display.',
      price: 449990,
      rating: 4.5,
      image: 'https://source.unsplash.com/400x300/?tablet,samsung',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 4,
    },
    {
      id: 18,
      name: 'Microsoft Surface Pro 9',
      description: 'Versatile 2-in-1 tablet and laptop hybrid.',
      price: 599990,
      rating: 4.4,
      image: 'https://source.unsplash.com/400x300/?surface,tablet',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 4,
    },
    {
      id: 19,
      name: 'Lenovo Tab P11 Pro',
      description: 'Mid-range tablet with good multimedia features.',
      price: 149990,
      rating: 4.1,
      image: 'https://source.unsplash.com/400x300/?lenovo,tablet',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 4,
    },
    {
      id: 20,
      name: 'Huawei MatePad Pro',
      description: 'Premium tablet with sleek design and performance.',
      price: 199990,
      rating: 4.2,
      image: 'https://source.unsplash.com/400x300/?huawei,tablet',
      images: [],
      link: 'https://kaspi.kz/',
      likes: 0,
      categoryId: 4,
    },
  ];

  getCategories(): Category[] {
    return this.categories.slice();
  }

  getProductsByCategory(categoryId: number): Product[] {
    return this.products.filter((p) => p.categoryId === categoryId);
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter((p) => p.id !== productId);
  }

  // Useful for debugging / full list
  getAllProducts(): Product[] {
    return this.products.slice();
  }
}
