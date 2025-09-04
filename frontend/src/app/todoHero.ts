import { Component, Input } from "@angular/core";

@Component({
  selector: 'todo-hero',
  standalone: true,
  template: `
  <div class="alert alert-info text-center my-3 shadow-sm">
    <h4 class="mb-0">Completadas: {{ completed }} / {{ total }}</h4>
  </div>
  `
})
export class TodoHero {
  @Input() completed: number = 0;
  @Input() total: number = 0;
}
