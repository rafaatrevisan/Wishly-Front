import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <i [class]="'fas fa-' + icon + ' fa-4x mb-3'"></i>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #7f8c8d;
      
      i {
        color: #bdc3c7;
      }

      h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
      }
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon: string = 'inbox';
  @Input() title: string = 'Nada aqui';
  @Input() message: string = 'Não há itens para exibir';
}