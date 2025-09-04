import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Todo } from '../models/todo.model';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <ul class="list-group my-3">
      <li *ngFor="let todo of todos" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div><b>{{ todo.titulo }}</b> ({{ todo.numero }})</div>
          <div class="small">{{ todo.descripcion || '—' }} · {{ todo.fecha_creacion | date:'short' }}</div>
        </div>

        <!-- Menu para cambiar el estado -->
        <select [(ngModel)]="todo.estado" class="form-select form-select-sm w-auto">
          <option value="pendiente">pendiente</option>
          <option value="en progreso">en progreso</option>
          <option value="completado">completado</option>
        </select>
        <button (click)="deleteTodo(todo.id)">Borrar</button>
      </li>
    </ul>
  `
})
export class TodoList {
  @Input() todos: Todo[] = [];
  @Output() delete = new EventEmitter<number>();

  deleteTodo(id : number){
    this.delete.emit(id);
  }
}
