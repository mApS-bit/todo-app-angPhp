import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Todo } from '../models/todo.model';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <ul class="list-group list-group-flush">
        <li *ngFor="let todo of todos"
    [ngClass]="{
      'list-group-item-success': todo.estado === 'completado',
      'list-group-item-warning': todo.estado === 'en progreso',
      'list-group-item-secondary': todo.estado === 'pendiente'
    }"
    class="list-group-item d-flex justify-content-between align-items-center">

            <div>
            <div><b>{{ todo.titulo }}</b>   ({{ todo.numero }})</div>
            <div class="text-muted small">{{ todo.descripcion || '—' }} · {{ todo.fecha_creacion | date:'short' }}</div>
            </div>

            <div class="d-flex align-items-center gap-2">
            <select [(ngModel)]="todo.estado" 
            (ngModelChange)="onEstadoChange(todo, $event)"
            class="form-select form-select-sm">
                <option value="pendiente">pendiente</option>
                <option value="en progreso">en progreso</option>
                <option value="completado">completado</option>
            </select>
            <button (click)="deleteTodo(todo.id)" class="btn btn-danger btn-sm">Borrar</button>
            </div>
        </li>
    </ul>
`
})
export class TodoList {
  @Input() todos: Todo[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() onChangeState = new EventEmitter<{id: number, estado: Todo['estado']}>();

  deleteTodo(id : number){
    this.delete.emit(id);
  }

  onEstadoChange(tarea: Todo, newState : Todo['estado']){
    console.log('Cambio de estado:', tarea.id, '->', newState);
    this.onChangeState.emit({id: tarea.id, estado: newState});
  }
}
