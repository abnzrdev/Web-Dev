export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // KZT
  rating: number; // 1–5, can be decimal
  image: string; // main image URL
  images: string[]; // gallery image URLs
  link: string; // kaspi.kz product URL

  // New required properties for Lab 5
  likes: number;
  categoryId: number;
}
