import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ListaService } from '../../../../core/services/lista.service';
import { Lista } from '../../../../core/models/lista.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listas-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listas-page.component.html',
  styleUrls: ['./listas-page.component.scss']
})
export class ListasPageComponent implements OnInit {
  listas: Lista[] = [];
  loading = false;
  showModal = false;
  novaLista: Lista = { nome: '', descricao: '' };

  constructor(
    private listaService: ListaService,
    private toastr: ToastrService
  ) {}

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

  abrirModal(): void {
    this.showModal = true;
    this.novaLista = { nome: '', descricao: '' };
  }

  fecharModal(): void {
    this.showModal = false;
  }

  criarLista(): void {
    if (!this.novaLista.nome.trim()) {
      this.toastr.warning('Digite um nome para a lista');
      return;
    }

    this.listaService.criar(this.novaLista).subscribe({
      next: () => {
        this.toastr.success('Lista criada com sucesso!');
        this.fecharModal();
        this.carregarListas();
      }
    });
  }

  removerLista(id: number, nome: string): void {
    if (confirm(`Deseja realmente remover a lista "${nome}"?`)) {
      this.listaService.remover(id).subscribe({
        next: () => {
          this.toastr.success('Lista removida com sucesso!');
          this.carregarListas();
        }
      });
    }
  }
}
