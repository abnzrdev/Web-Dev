import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { Photo } from '../models/photo.model';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-photos.component.html',
  styleUrl: './album-photos.component.css'
})
export class AlbumPhotosComponent implements OnInit {
  albumId: number | null = null;
  photos: Photo[] = [];
  isLoading = true;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const parsedId = Number(idParam);

      if (!idParam || Number.isNaN(parsedId) || parsedId <= 0) {
        this.albumId = null;
        this.photos = [];
        this.isLoading = false;
        this.message = 'No photos found.';
        return;
      }

      this.albumId = parsedId;
      this.loadPhotos(parsedId);
    });
  }

  loadPhotos(id: number): void {
    this.isLoading = true;
    this.message = '';
    this.photos = [];

    this.albumService.getAlbumPhotos(id).subscribe({
      next: (photos) => {
        this.photos = photos;
        this.isLoading = false;

        if (photos.length === 0) {
          this.message = 'No photos found.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.message = 'Unable to load photos. Please try again.';
      }
    });
  }

  backToAlbum(): void {
    if (!this.albumId) {
      this.router.navigate(['/albums']);
      return;
    }

    this.router.navigate(['/albums', this.albumId]);
  }

}
