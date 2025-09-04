import { Component, signal, OnInit } from '@angular/core';
import { Tarea, TareasService } from './tareas/tareas.service';
import { UserView } from './userView';
import { TodoHero } from './todoHero';
import { FormTask } from './form';

@Component({
  selector: 'ns-root',
  standalone: true,
  imports: [UserView, TodoHero, FormTask],
  template: `
      <user-view></user-view>
      <todo-hero [total] = "tareas.length" [completed] = "completedTasks"></todo-hero>
      <form-task></form-task>
      <div>
         <h1>Lista de tareas</h1>
          <ul>
            @for (tarea of tareas; track tarea.id) {
              <li>
                {{ tarea.titulo }} - {{ tarea.estado }}
              </li>
            }
          </ul>
      </div>
  `
})
export class App implements OnInit {
  tareas : Tarea[] = [];
  completedTasks : number = 0; 
  protected readonly title = signal('frontend');

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.tareasService.getTareas().subscribe({
      next: (data: any) => {
        this.tareas = data.data 
        this.completedTasks = this.tareas.filter(tarea => tarea.estado === "completado").length;
      }, 
      error: (err) => console.log('Error al cargar tareas: ', err)
    });
  }
}
