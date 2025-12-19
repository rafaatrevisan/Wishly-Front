import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListasPageComponent } from './pages/listas-page/listas-page.component';
import { ListaDetalhesPageComponent } from './pages/lista-detalhes-page/lista-detalhes-page.component';

const routes: Routes = [
  { path: '', component: ListasPageComponent },
  { path: ':id', component: ListaDetalhesPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ListasModule { }