import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: 'todo-hero',
  standalone: true,
  template: `
  <div class="alert alert-info text-center my-3 shadow-sm">
    @if (total > 0) {
      @if (completed === total) {
        <h4 class="mb-0">Todas las tareas completadas!!</h4>
      } @else {
        <h4 class="mb-0">
          Completadas: {{ completed }} / {{ total }} |
          Pendientes: {{ onPause }} / {{ total }} |
          En Progreso: {{ total - completed - onPause }} / {{ total }}
        </h4>
      }
    } @else {
      <h4 class="mb-0">No hay pendientes. Felicitaciones!!</h4>
    }
  </div>
  `
})
export class TodoHero implements OnChanges{
  @Input() completed: number = 0;
  @Input() onPause: number = 0;
  @Input() total: number = 0;

  ngOnChanges() {
    if (this.total > 0 && this.completed === this.total){
      window.alert('Felicitaciones!! Todas las tareas están completadas! 🎉🎉')
    }
  }
}