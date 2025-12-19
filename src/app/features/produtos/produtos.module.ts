import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoAdicionarPageComponent } from './pages/produto-adicionar-page/produto-adicionar-page.component';
import { ProdutoDetalhesPageComponent } from './pages/produto-detalhes-page/produto-detalhes-page.component';

const routes: Routes = [
  { path: 'adicionar/:listaId', component: ProdutoAdicionarPageComponent },
  { path: ':id', component: ProdutoDetalhesPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ProdutosModule { }