import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdutoService } from '../../../../core/services/produto.service';
import { ListaService } from '../../../../core/services/lista.service';
import { Produto } from '../../../../core/models/produto.model';
import { ToastrService } from 'ngx-toastr';
import { LOJA_INFO } from '../../../../core/models/loja.enum';

@Component({
  selector: 'app-lista-detalhes-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-detalhes-page.component.html',
  styleUrls: ['./lista-detalhes-page.component.scss']
})
export class ListaDetalhesPageComponent implements OnInit {
  listaId!: number;
  produtos: Produto[] = [];
  totalLista = 0;
  loading = false;
  atualizandoPrecos = false;
  lojaInfo = LOJA_INFO;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private listaService: ListaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.listaId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarProdutos();
    this.carregarTotal();
  }

  carregarProdutos(): void {
    this.loading = true;
    this.produtoService.listarPorLista(this.listaId).subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  carregarTotal(): void {
    this.listaService.calcularTotal(this.listaId).subscribe({
      next: (response) => {
        this.totalLista = response.total;
      }
    });
  }

  atualizarPrecos(): void {
    this.atualizandoPrecos = true;
    this.produtoService.atualizarPrecosDaLista(this.listaId).subscribe({
      next: () => {
        this.toastr.success('Preços atualizados com sucesso!');
        this.carregarProdutos();
        this.carregarTotal();
        this.atualizandoPrecos = false;
      },
      error: () => {
        this.atualizandoPrecos = false;
      }
    });
  }

  removerProduto(id: number, nome: string): void {
    if (confirm(`Deseja realmente remover "${nome}"?`)) {
      this.produtoService.remover(id).subscribe({
        next: () => {
          this.toastr.success('Produto removido!');
          this.carregarProdutos();
          this.carregarTotal();
        }
      });
    }
  }

  getLojaInfo(loja: string) {
    return this.lojaInfo[loja as keyof typeof LOJA_INFO] || this.lojaInfo.DESCONHECIDA;
  }
}