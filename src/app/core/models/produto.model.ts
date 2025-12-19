export interface Produto {
  id?: number;
  nome: string;
  link: string;
  loja: string;
  precoAtual: number;
  imagemUrl: string;
  dataCriacao?: Date;
  ultimaAtualizacao?: Date;
  lista?: {
    id: number;
    nome: string;
    descricao?: string;
    createdAt?: Date;
  };
}

export interface ProdutoRequestDTO {
  nome?: string;
  link: string;
  loja?: string;
  precoAtual?: number;
  imagemUrl?: string;
  listaId: number;
}

export interface ProdutoResponseDTO extends Produto {
  listaId: number;
  listaNome: string;
}