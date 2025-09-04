import { Component, signal, OnInit } from '@angular/core';
import { TareasService } from './tareas/tareas.service';
import { Todo } from '../models/todo.model';
import { UserView } from './userView';
import { TodoHero } from './todoHero';
import { FormTask } from './form';
import { TodoList } from './todoList';

@Component({
  selector: 'ns-root',
  standalone: true,
  imports: [UserView, TodoHero, FormTask, TodoList],
  template: `
    <div class="container my-4">
      <user-view></user-view>

      <todo-hero [total]="tareas.length" [completed]="completedTasks" class="my-3"></todo-hero>

      <form-task class="mb-4" (add)="onAddTask($event)"></form-task>

      <div class="card">
        <div class="card-header">
          <h2>Lista de tareas</h2>
        </div>
        <div class="card-body p-0">
          <todo-list [todos]="tareas"
            (delete)="onDeleteTask($event)"
            (onChangeState)="onUpdateEstado($event)"
          ></todo-list>
        </div>
      </div>
    </div>
    `
})
export class App implements OnInit {
  tareas : Todo[] = [];
  completedTasks : number = 0; 
  protected readonly title = signal('frontend');

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.tareasService.getTareas().subscribe({
      next: (data: any) => {
        this.tareas = data.data.map((t:any) => ({
          ...t ,
          fecha_creacion: new Date(t.fecha_creacion)
        })); 
        this.completedTasks = this.tareas.filter(tarea => tarea.estado === "completado").length;
      }, 
      error: (err) => console.log('Error al cargar tareas: ', err)
    });
  }

  //POST nueva tarea Method
  onAddTask(task : {titulo : string; numero : string; descripcion?: string}){
    this.tareasService.createTarea(task).subscribe({
    next: (res: any) => {
      const nuevaTarea: Todo = {
        id: res.id, 
        titulo: task.titulo,
        numero: task.numero,
        descripcion: task.descripcion,
        estado: 'pendiente',
        fecha_creacion: new Date()
      };
      this.tareas.push(nuevaTarea);
      this.completedTasks = this.tareas.filter(t => t.estado === "completado").length;
    },
    error: (err) => console.error('Error al crear tarea: ', err)
  });
  }
  //UPDATE
  onUpdateEstado(update: { id: number; estado: Todo['estado'] }) {
    console.log('Actualizar tarea:', update);
  this.tareasService.updateTarea(update.id, { estado: update.estado }).subscribe({
    next: () => {
      // Actualizar localmente
      const tarea = this.tareas.find(t => t.id === update.id);
      if (tarea) tarea.estado = update.estado as Todo["estado"];

      // Recalcular completadas
      this.completedTasks = this.tareas.filter(t => t.estado === "completado").length;
    },
    error: (err) => console.error('Error al actualizar tarea: ', err)
  });
}


 //DELETE tarea handler method
  onDeleteTask(id: number) {
  this.tareasService.deleteTarea(id).subscribe({
    next: () => {
      this.tareas = this.tareas.filter(t => t.id !== id);
      this.completedTasks = this.tareas.filter(t => t.estado === "completado").length;
    },
    error: (err) => console.error('Error al borrar tarea: ', err)
  });
}

}
