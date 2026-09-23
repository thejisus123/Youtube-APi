import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Youtube } from './services/youtube';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  textoBusqueda = '';
  resultados: any[] = [];

  videoSeleccionado: any = null;
  videoUrl: SafeResourceUrl | null = null;

  constructor(
    private youtube: Youtube,
    private sanitizer: DomSanitizer
  ) {}

  buscar(): void {
    if (!this.textoBusqueda.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Búsqueda vacía',
        text: 'Escribe algo para buscar videos.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.youtube.buscarVideos(this.textoBusqueda).subscribe({
      next: (respuesta) => {
        this.resultados = respuesta.items;
        this.videoSeleccionado = null;
        this.videoUrl = null;
      },
      error: (error) => {
        console.error('Error al buscar videos:', error);
        this.resultados = [];

        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'No se pudieron cargar los videos.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  seleccionarVideo(video: any): void {
    this.videoSeleccionado = video;

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' +
      video.id.videoId +
      '?autoplay=1'
    );

    setTimeout(() => {
      document.getElementById('reproductor')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }

  cerrarVideo(): void {
    this.videoSeleccionado = null;
    this.videoUrl = null;
  }
}