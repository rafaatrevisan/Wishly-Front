import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ListaService } from '../../core/services/lista.service';
import { Lista } from '../../core/models/lista.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listas: Lista[] = [];
  loading = true;

  constructor(private listaService: ListaService) {}

  ngOnInit(): void {
    this.carregarListas();
  }

  carregarListas(): void {
    this.loading = true;
    this.listaService.listarTodas().subscribe({
      next: (listas) => {
        this.listas = listas;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}