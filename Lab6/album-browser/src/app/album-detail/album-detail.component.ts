import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent implements OnInit {
  albumId: number | null = null;
  album: Album | null = null;
  editedTitle = '';
  isLoading = true;
  isSaving = false;
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
        this.album = null;
        this.isLoading = false;
        this.message = 'Album not found.';
        return;
      }

      this.albumId = parsedId;
      this.loadAlbum(parsedId);
    });
  }

  loadAlbum(id: number): void {
    this.isLoading = true;
    this.message = '';
    this.album = null;

    this.albumService.getAlbum(id).subscribe({
      next: (album) => {
        if (!album || typeof album.id !== 'number') {
          this.message = 'Album not found.';
          this.isLoading = false;
          return;
        }

        this.album = album;
        this.editedTitle = album.title;
        this.isLoading = false;
      },
      error: () => {
        this.message = 'Unable to load album. Please try again.';
        this.isLoading = false;
      }
    });
  }

  saveAlbum(): void {
    if (!this.album || this.isSaving) {
      return;
    }

    this.isSaving = true;
    this.message = '';

    const updatedAlbum: Album = {
      ...this.album,
      title: this.editedTitle.trim() || this.album.title
    };

    this.albumService.updateAlbum(updatedAlbum).subscribe({
      next: (savedAlbum) => {
        this.album = {
          ...updatedAlbum,
          ...savedAlbum
        };
        this.editedTitle = this.album.title;
        this.message = 'Album saved.';
        this.isSaving = false;
      },
      error: () => {
        this.message = 'Unable to save album. Please try again.';
        this.isSaving = false;
      }
    });
  }

  viewPhotos(): void {
    if (!this.albumId) {
      return;
    }

    this.router.navigate(['/albums', this.albumId, 'photos']);
  }

  backToAlbums(): void {
    this.router.navigate(['/albums']);
  }
}
