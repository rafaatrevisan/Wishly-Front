# 🎯 Wishlist - Frontend Angular

Sistema de gerenciamento de listas de desejos com acompanhamento de preços e automação para lojas específicas.

---

## 🚀 Tecnologias Utilizadas

- **Angular 20.3.7**
- **Bootstrap 5**
- **Chart.js** (gráficos)
- **Font Awesome** (ícones)
- **ngx-toastr** (notificações)
- **SCSS** (estilos)

---

## 📦 Instalação e Configuração

### 1. Pré-requisitos

```bash
node >= 18.0.0
npm >= 9.0.0
Angular CLI 20.3.7
```

### 2. Criar o Projeto

```bash
# Criar projeto Angular
ng new wishlist-frontend --routing --style=scss

# Navegar para o diretório
cd wishlist-frontend
```

### 3. Instalar Dependências

```bash
# Bootstrap e ícones
npm install bootstrap@5
npm install @fortawesome/fontawesome-free

# Gráficos
npm install chart.js

# Componentes Bootstrap
npm install @ng-bootstrap/ng-bootstrap

# Notificações
npm install ngx-toastr

# Animações
npm install @angular/animations
```

### 4. Configurar angular.json

Adicione ao array `styles` e `scripts`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
  "node_modules/ngx-toastr/toastr.css",
  "src/styles.scss"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

### 5. Configurar API Base URL

Edite `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'  // URL do seu backend
};
```

### 6. Configurar app.config.ts

Adicione os providers necessários (já está no artefato fornecido).

### 7. Copiar Estrutura de Pastas

Crie a estrutura conforme o documento fornecido:

```
src/app/
├── core/
│   ├── services/
│   ├── models/
│   └── interceptors/
├── shared/
│   └── components/
├── features/
│   ├── dashboard/
│   ├── listas/
│   └── produtos/
```

---

## 🏗️ Estrutura do Projeto

### Core Module (Serviços e Models)

- **services/**: Serviços para comunicação com API
  - `api.service.ts` - Serviço base HTTP
  - `lista.service.ts` - Gerenciamento de listas
  - `produto.service.ts` - Gerenciamento de produtos
  - `historico.service.ts` - Histórico de preços

- **models/**: Interfaces TypeScript
  - `lista.model.ts`
  - `produto.model.ts`
  - `historico.model.ts`
  - `loja.enum.ts`

### Shared Module (Componentes Reutilizáveis)

- `navbar/` - Barra de navegação
- `loading-spinner/` - Spinner de carregamento
- `empty-state/` - Estado vazio

### Features Modules

#### Dashboard
- Página inicial com visão geral

#### Listas
- **listas-page**: Lista todas as wishlists
- **lista-detalhes-page**: Produtos de uma lista específica

#### Produtos
- **produto-adicionar-page**: Formulário para adicionar produtos
- **produto-detalhes-page**: Detalhes com gráfico de histórico

---

## 🎨 Design System

### Cores Principais

```scss
--primary: #667eea
--primary-dark: #764ba2
--success: #27ae60
--danger: #e74c3c
--warning: #f39c12
--info: #3498db
```

### Componentes Customizados

- Gradientes em botões e backgrounds
- Cards com hover effects
- Animações suaves (fadeIn, fadeInUp, fadeInDown)
- Badges personalizados para lojas

---

## 📱 Funcionalidades

### ✅ Implementadas

1. **Dashboard**
   - Visão geral das listas
   - Cards informativos
   - Lojas suportadas

2. **Gerenciamento de Listas**
   - Criar lista
   - Listar todas
   - Remover lista
   - Ver produtos da lista
   - Calcular total

3. **Gerenciamento de Produtos**
   - Adicionar produto (automático ou manual)
   - Listar produtos por lista
   - Remover produto
   - Atualizar preço manualmente
   - Atualizar preço automaticamente (lojas com scraper)
   - Atualizar todos os preços da lista

4. **Histórico de Preços**
   - Visualização em gráfico
   - Filtros por período (7, 30, 90 dias)
   - Estatísticas (menor, maior, variação)

5. **UI/UX**
   - Design moderno e responsivo
   - Animações suaves
   - Feedback visual (toasts)
   - Loading states
   - Empty states

### 🔮 Preparado para Futuras Implementações

- **Autenticação**: Estrutura de services já pronta
- **Guards**: Pasta criada para proteção de rotas
- **Interceptors**: HTTP Error já implementado
- **Alertas de Preço**: Models e services extensíveis
- **Notificações Push**: Estrutura modular permite integração

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
ng serve
# Acesse: http://localhost:4200

# Build de produção
ng build --configuration production

# Executar testes
ng test

# Gerar componente
ng generate component features/exemplo/components/exemplo

# Gerar service
ng generate service core/services/exemplo
```

---

## 🔗 Integração com Backend

O frontend espera que o backend esteja rodando em `http://localhost:8080` com os seguintes endpoints:

### Listas
- `GET /listas` - Listar todas
- `POST /listas` - Criar
- `DELETE /listas/{id}` - Remover

### Produtos
- `GET /produtos/lista/{listaId}` - Listar por lista
- `POST /produtos` - Criar
- `PUT /produtos/{id}` - Atualizar
- `DELETE /produtos/{id}` - Remover
- `PUT /produtos/{id}/atualizar-preco-automatico` - Atualizar preço automático
- `POST /produtos/lista/{listaId}/atualizar-precos` - Atualizar todos
- `GET /produtos/lista/{listaId}/total` - Calcular total

### Histórico
- `GET /produtos/{produtoId}/historico` - Obter histórico
  - Query params: `dataInicio`, `dataFim`

### Observação
- O projeto do backend também está disponível no meu perfil para utilizar em conjunto com essa aplicação frontend.

---

## 🎯 Boas Práticas Implementadas

1. **Standalone Components**: Todos os componentes são standalone
2. **Lazy Loading**: Módulos carregados sob demanda
3. **Separation of Concerns**: Lógica separada em services
4. **Reactive Programming**: Uso de Observables
5. **Type Safety**: Interfaces TypeScript em todos os models
6. **Error Handling**: Interceptor global + tratamento local
7. **Responsive Design**: Mobile-first approach
8. **Accessibility**: Uso semântico de HTML
9. **Performance**: OnPush strategy onde possível
10. **Code Organization**: Estrutura modular e escalável

---

## 📚 Próximos Passos

1. **Implementar Autenticação**
   - Login/Registro
   - JWT tokens
   - Guards de rota

2. **Alertas de Preço**
   - Definir limite de preço desejado
   - Notificações quando preço atingir meta

3. **Compartilhamento**
   - Compartilhar listas publicamente
   - Link único para cada lista

4. **Exportação**
   - Exportar lista em PDF
   - Exportar relatório de histórico

5. **Dashboard Analytics**
   - Gráficos de economia
   - Estatísticas gerais
   - Produtos mais desejados

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'chart.js'"
```bash
npm install chart.js
```

### Erro: "Module not found: @ng-bootstrap/ng-bootstrap"
```bash
npm install @ng-bootstrap/ng-bootstrap
```

### CORS Error
Certifique-se de que o backend tem CORS habilitado:
```java
@CrossOrigin // Nos controllers
```

### Estilos não carregando
Verifique se as importações no `angular.json` estão corretas.

---

## 👨‍💻 Desenvolvimento

Criado com ❤️ usando Angular, Bootstrap, IA e muito café ☕

### Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.