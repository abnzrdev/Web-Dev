import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, finalize, of, timeout } from 'rxjs';
import { AlbumService } from '../album.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.getAlbums()
      .pipe(
        timeout(10000),
        catchError(() => {
          this.errorMessage = 'Could not load albums. Check your network and try again.';
          return of([] as Album[]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((albums) => {
        this.albums = albums;
      });
  }

  deleteAlbum(albumId: number): void {
    this.albumService.deleteAlbum(albumId).subscribe(() => {
      this.albums = this.albums.filter((album) => album.id !== albumId);
    });
  }
}
