import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3rem;
    }
  `]
})
export class LoadingSpinnerComponent { }
