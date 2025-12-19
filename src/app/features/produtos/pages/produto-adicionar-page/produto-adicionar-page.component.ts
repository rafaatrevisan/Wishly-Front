import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../../../../core/services/produto.service';
import { ProdutoRequestDTO } from '../../../../core/models/produto.model';
import { LOJA_INFO, LOJAS_COM_SCRAPER, Loja } from '../../../../core/models/loja.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produto-adicionar-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './produto-adicionar-page.component.html',
  styleUrls: ['./produto-adicionar-page.component.scss']
})
export class ProdutoAdicionarPageComponent implements OnInit {
  listaId!: number;
  tipoLoja: 'automatica' | 'manual' = 'automatica';
  lojaInfo = LOJA_INFO;
  lojasAutomaticas = LOJAS_COM_SCRAPER;
  
  produto: ProdutoRequestDTO = {
    link: '',
    listaId: 0
  };

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.listaId = Number(this.route.snapshot.paramMap.get('listaId'));
    this.produto.listaId = this.listaId;
  }

  selecionarTipo(tipo: 'automatica' | 'manual'): void {
    this.tipoLoja = tipo;
    this.produto = {
      link: '',
      listaId: this.listaId
    };
  }

  adicionarProduto(): void {
    if (this.tipoLoja === 'automatica') {
      if (!this.produto.link.trim()) {
        this.toastr.warning('Informe o link do produto');
        return;
      }
    } else {
      if (!this.produto.nome || !this.produto.loja || 
          !this.produto.precoAtual || !this.produto.imagemUrl || 
          !this.produto.link) {
        this.toastr.warning('Preencha todos os campos obrigatórios');
        return;
      }
    }

    this.loading = true;
    this.produtoService.criar(this.produto).subscribe({
      next: () => {
        this.toastr.success('Produto adicionado com sucesso!');
        this.router.navigate(['/listas', this.listaId]);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getLojaKeys() {
    return Object.keys(this.lojaInfo).filter(
      key => key !== 'DESCONHECIDA'
    );
  }

  getLojaInfo(loja: string | Loja) {
    return this.lojaInfo[loja as keyof typeof this.lojaInfo] || this.lojaInfo.DESCONHECIDA;
  }
}
