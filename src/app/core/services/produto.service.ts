import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import {
  Produto,
  ProdutoRequestDTO,
  ProdutoResponseDTO
} from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends ApiService {
  private endpoint = '/produtos';

  listarPorLista(listaId: number): Observable<Produto[]> {
    return this.get<Produto[]>(`${this.endpoint}/lista/${listaId}`);
  }

  criar(produto: ProdutoRequestDTO): Observable<ProdutoResponseDTO> {
    return this.post<ProdutoResponseDTO>(this.endpoint, produto);
  }

  buscarPorId(id: number): Observable<ProdutoResponseDTO> {
    return this.get<ProdutoResponseDTO>(`${this.endpoint}/${id}`);
  }

  atualizar(
    id: number,
    produto: Partial<ProdutoRequestDTO>
  ): Observable<ProdutoResponseDTO> {
    return this.put<ProdutoResponseDTO>(`${this.endpoint}/${id}`, produto);
  }

  atualizarPrecoAutomatico(id: number): Observable<ProdutoResponseDTO> {
    return this.put<ProdutoResponseDTO>(
      `${this.endpoint}/${id}/atualizar-preco-automatico`,
      {}
    );
  }

  atualizarPrecosDaLista(listaId: number): Observable<ProdutoResponseDTO[]> {
    return this.post<ProdutoResponseDTO[]>(
      `${this.endpoint}/lista/${listaId}/atualizar-precos`,
      {}
    );
  }

  remover(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }
}
