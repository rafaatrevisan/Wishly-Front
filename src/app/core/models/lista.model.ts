export interface Lista {
  id?: number;
  nome: string;
  descricao?: string;
  dataCriacao?: Date;
}

export interface ListaComTotal extends Lista {
  totalProdutos?: number;
  valorTotal?: number;
}