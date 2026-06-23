import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  apiUrl = 'http://3.134.92.235/api';
  
  nodoRespuesta = '';
  mensajeRespuesta = 'Ninguna petición enviada aún.';
  huboError = false;

  async registrarUsuario() {
    this.mensajeRespuesta = 'Conectando con el servidor...';
    try {
      const response = await fetch(`${this.apiUrl}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: 'Usuario Prueba', fecha: new Date() })
      });
      
      const data = await response.json();
      this.nodoRespuesta = data.servidor_nodo || 'Desconocido';
      this.mensajeRespuesta = data.mensaje || 'Usuario registrado con éxito';
      this.huboError = false;
      
    } catch (error) {
      this.nodoRespuesta = 'FALLO DE CONEXIÓN';
      this.mensajeRespuesta = 'No se pudo conectar con los servidores backend.';
      this.huboError = true;
    }
  }

  async listarArchivos() {
    this.mensajeRespuesta = 'Solicitando archivos al servidor...';
    try {
      const response = await fetch(`${this.apiUrl}/archivos`);
      const data = await response.json();
      
      this.nodoRespuesta = data.servidor_nodo || 'Desconocido';
      this.mensajeRespuesta = `Se encontraron ${data.archivos?.length || 0} archivos multimedia.`;
      this.huboError = false;
      
    } catch (error) {
      this.nodoRespuesta = 'FALLO DE CONEXIÓN';
      this.mensajeRespuesta = 'No se pudo conectar con los servidores backend.';
      this.huboError = true;
    }
  }
}