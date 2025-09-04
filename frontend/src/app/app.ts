import { Component, signal, OnInit } from '@angular/core';
import { Tarea, TareasService } from './tareas/tareas.service';

@Component({
  selector: 'ns-root',
  standalone: true,
  template: `
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
  protected readonly title = signal('frontend');

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.tareasService.getTareas().subscribe({
      next: (data: any) => this.tareas = data.data, // 👈 importante: usar resp.data
      error: (err) => console.log('Error al cargar tareas: ', err)
    });
  }
}
