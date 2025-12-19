export interface ProdutoPrecoHistorico {
  id: number;
  produtoId: number;
  preco: number;
  loja: string;
  dataColeta: Date;
}

export interface ProdutoPrecoHistoricoResponseDTO {
  id: number;
  preco: number;
  loja: string;
  dataColeta: string;
}