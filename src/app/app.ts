import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('youtube-app');

  buscar(input: HTMLInputElement) {
    const texto = input.value.trim();

    if (!texto) {
      Swal.fire({
        icon: 'warning',
        title: 'Búsqueda vacía',
        text: 'Escribe algo para buscar videos.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Buscando...',
      text: `Buscaremos videos de: ${texto}`,
      confirmButtonText: 'Aceptar'
    });
  }
}