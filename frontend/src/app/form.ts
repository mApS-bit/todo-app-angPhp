import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Todo } from '../models/todo.model';  

@Component({
  selector: 'form-task',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submitTask()" class="d-flex my-3">
      <input type="text"
             [(ngModel)]="titulo"
             name="title"
             class="form-control me-2"
             placeholder="Título de la tarea">
      <input type="text"
             [(ngModel)]="numero"
             name="numero"
             class="form-control me-2"
             placeholder="Número binario">
      <input type="text"
             [(ngModel)]="descripcion"
             name="descripcion"
             class="form-control me-2"
             placeholder="Descripción (opcional)">
      <button type="submit" class="btn btn-success">Agregar</button>
    </form>
  `
})
export class FormTask {
  titulo: string = '';
  numero: string = '';
  descripcion?: string;

  @Output() add = new EventEmitter<{ titulo: string; numero: string; descripcion?: string }>();

  submitTask() {
    if (!this.titulo.trim() || !this.numero.trim()) return;

    this.add.emit({
      titulo: this.titulo.trim(),
      numero: this.numero.trim(),
      descripcion: this.descripcion?.trim() || undefined
    });

    // limpiar inputs
    this.titulo = '';
    this.numero = '';
    this.descripcion = '';
  }
}
