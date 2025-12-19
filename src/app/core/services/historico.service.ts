import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { ProdutoPrecoHistoricoResponseDTO } from '../models/historico.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService extends ApiService {
  obterHistorico(
    produtoId: number,
    dataInicio: string,
    dataFim: string
  ): Observable<ProdutoPrecoHistoricoResponseDTO[]> {
    const params = new HttpParams()
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim);

    return this.get<ProdutoPrecoHistoricoResponseDTO[]>(
      `/produtos/${produtoId}/historico`,
      params
    );
  }
}
