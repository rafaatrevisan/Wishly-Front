import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService extends ApiService {
  private endpoint = '/listas';

  listarTodas(): Observable<Lista[]> {
    return this.get<Lista[]>(this.endpoint);
  }

  criar(lista: Lista): Observable<Lista> {
    return this.post<Lista>(this.endpoint, lista);
  }

  remover(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }

  calcularTotal(listaId: number): Observable<{ total: number }> {
    return this.get<{ total: number }>(`/produtos/lista/${listaId}/total`);
  }
}
