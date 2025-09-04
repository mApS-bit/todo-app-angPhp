import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
/*
export interface Tarea {
  id: number;
  titulo: string;
  estado: string;
}
*/


@Injectable({ providedIn: 'root' })
export class TareasService {
  private apiUrl = 'http://localhost:8000/tareas/task.php';

  constructor(private http: HttpClient) {}

  getTareas(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  createTarea(task: { titulo: string; numero: string; descripcion?: string }): Observable<any> {
  return this.http.post(this.apiUrl, task);
  }

  updateTarea(id: number, cambios: Partial<Todo>): Observable<any> {
  return this.http.put(`${this.apiUrl}?id=${id}`, cambios);
}


  deleteTarea(id: number) {
    return this.http.delete<any>(`http://localhost:8000/tareas/task.php?id=${id}`);
  }

}
