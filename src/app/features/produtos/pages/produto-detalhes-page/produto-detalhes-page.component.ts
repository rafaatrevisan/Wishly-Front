import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Chart, registerables, TooltipItem } from 'chart.js';
import { ProdutoService } from '../../../../core/services/produto.service';
import { HistoricoService } from '../../../../core/services/historico.service';
import { ProdutoResponseDTO } from '../../../../core/models/produto.model';
import { ProdutoPrecoHistoricoResponseDTO } from '../../../../core/models/historico.model';
import { Loja, LOJA_INFO } from '../../../../core/models/loja.enum';
import { ToastrService } from 'ngx-toastr';

// Registrar componentes do Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-produto-detalhes-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './produto-detalhes-page.component.html',
  styleUrls: ['./produto-detalhes-page.component.scss']
})
export class ProdutoDetalhesPageComponent
  implements OnInit, AfterViewChecked {

  @ViewChild('chartCanvas') chartCanvas?: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;
  private graficoCriado = false;

  produtoId!: number;
  produto?: ProdutoResponseDTO;
  historico: ProdutoPrecoHistoricoResponseDTO[] = [];
  lojaInfo = LOJA_INFO;

  loading = true;
  showEditModal = false;
  novoPreco = 0;

  diasHistorico = 30;

  formularioEdicao = {
    nome: '',
    link: '',
    loja: '',
    imagemUrl: '',
    precoAtual: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private historicoService: HistoricoService,
    private toastr: ToastrService
  ) {}

  get lojas(): string[] {
    return Object.values(Loja);
  }

  ngOnInit(): void {
    this.produtoId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarDados();
  }

  ngAfterViewChecked(): void {
    if (
      !this.graficoCriado &&
      this.historico.length > 0 &&
      this.chartCanvas
    ) {
      this.atualizarGrafico();
      this.graficoCriado = true;
    }
  }

  carregarDados(): void {
    this.loading = true;

    this.produtoService.buscarPorId(this.produtoId).subscribe({
      next: (produto) => {
        this.produto = produto;
        this.novoPreco = produto.precoAtual;
        this.carregarHistorico();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  carregarHistorico(): void {
    const dataFim = new Date();
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - this.diasHistorico);

    const dataInicioStr = dataInicio.toISOString().split('T')[0];
    const dataFimStr = dataFim.toISOString().split('T')[0];

    this.historicoService.obterHistorico(
      this.produtoId,
      dataInicioStr,
      dataFimStr
    ).subscribe({
      next: (historico) => {
        this.historico = historico;
        this.graficoCriado = false;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  atualizarGrafico(): void {
    if (!this.chartCanvas) {
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const labels: string[] = [];
    const precos: number[] = [];

    this.historico.forEach(h => {
      const data = new Date(h.dataColeta);
      labels.push(data.toLocaleDateString('pt-BR'));
      precos.push(h.preco);
    });

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Preço (R$)',
          data: precos,
          fill: true,
          tension: 0.4,
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          pointBackgroundColor: '#667eea',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#667eea',
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (context: TooltipItem<'line'>) =>
                `R$ ${Number(context.parsed.y ?? 0).toFixed(2)}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: (value: string | number) => `R$ ${Number(value)}`
            }
          }
        }
      }
    });
  }

  alterarPeriodo(dias: number): void {
    this.diasHistorico = dias;
    this.graficoCriado = false;
    this.carregarHistorico();
  }

  abrirModalEdicao(): void {
    if (this.produto) {
      this.formularioEdicao = {
        nome: this.produto.nome,
        link: this.produto.link,
        loja: this.produto.loja,
        imagemUrl: this.produto.imagemUrl,
        precoAtual: this.produto.precoAtual
      };
    }
    this.showEditModal = true;
  }

  fecharModal(): void {
    this.showEditModal = false;
  }

  atualizarProduto(): void {
    if (!this.formularioEdicao.nome.trim()) {
      this.toastr.warning('Informe o nome do produto');
      return;
    }

    if (!this.formularioEdicao.link.trim()) {
      this.toastr.warning('Informe o link do produto');
      return;
    }

    if (!this.formularioEdicao.loja.trim()) {
      this.toastr.warning('Selecione uma loja');
      return;
    }

    if (this.formularioEdicao.precoAtual <= 0) {
      this.toastr.warning('Informe um preço válido');
      return;
    }

    if (!this.formularioEdicao.imagemUrl.trim()) {
      this.toastr.warning('Informe a URL da imagem');
      return;
    }

    this.produtoService.atualizar(this.produtoId, {
      nome: this.formularioEdicao.nome,
      link: this.formularioEdicao.link,
      loja: this.formularioEdicao.loja,
      imagemUrl: this.formularioEdicao.imagemUrl,
      precoAtual: this.formularioEdicao.precoAtual,
      listaId: this.produto!.listaId
    }).subscribe({
      next: () => {
        this.toastr.success('Produto atualizado com sucesso!');
        this.fecharModal();
        this.carregarDados();
      },
      error: () => {
        this.toastr.error('Erro ao atualizar produto');
      }
    });
  }

  atualizarAutomatico(): void {
    const info = this.getLojaInfo(this.produto!.loja);

    if (!info.temAutomacao) {
      this.toastr.info('Esta loja não possui atualização automática');
      return;
    }

    this.produtoService.atualizarPrecoAutomatico(this.produtoId).subscribe({
      next: () => {
        this.toastr.success('Preço atualizado automaticamente!');
        this.carregarDados();
      }
    });
  }

  getLojaInfo(loja: string) {
    return (
      this.lojaInfo[loja as keyof typeof LOJA_INFO] ||
      this.lojaInfo.DESCONHECIDA
    );
  }

  getVariacao(): { valor: number; tipo: 'alta' | 'baixa' | 'estavel' } {
    if (this.historico.length < 2) {
      return { valor: 0, tipo: 'estavel' };
    }

    const precoAtual = this.historico[this.historico.length - 1].preco;
    const precoAnterior = this.historico[this.historico.length - 2].preco;
    const variacao = ((precoAtual - precoAnterior) / precoAnterior) * 100;

    if (variacao > 0) return { valor: variacao, tipo: 'alta' };
    if (variacao < 0) return { valor: Math.abs(variacao), tipo: 'baixa' };
    return { valor: 0, tipo: 'estavel' };
  }

  getMenorPreco(): number {
    if (this.historico.length === 0) return 0;
    return Math.min(...this.historico.map(h => h.preco));
  }

  getMaiorPreco(): number {
    if (this.historico.length === 0) return 0;
    return Math.max(...this.historico.map(h => h.preco));
  }
}
