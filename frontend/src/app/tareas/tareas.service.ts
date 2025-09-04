import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarea {
  id: number;
  titulo: string;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class TareasService {
  private apiUrl = 'http://localhost:8000/tareas/task.php';

  constructor(private http: HttpClient) {}

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }
}
