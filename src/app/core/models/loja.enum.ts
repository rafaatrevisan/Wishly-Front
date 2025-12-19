export enum Loja {
  ALIEXPRESS = 'ALIEXPRESS',
  AMAZON = 'AMAZON',
  KABUM = 'KABUM',
  MERCADO_LIVRE = 'MERCADO_LIVRE',
  DESCONHECIDA = 'DESCONHECIDA'
}

export const LOJAS_COM_SCRAPER: Loja[] = [
  Loja.ALIEXPRESS,
  Loja.AMAZON,
  Loja.KABUM,
  Loja.MERCADO_LIVRE
];

export const LOJA_INFO = {
  [Loja.ALIEXPRESS]: {
    nome: 'AliExpress',
    cor: '#FF6A00',
    icone: 'images/stores/aliexpress.png',
    temAutomacao: true
  },
  [Loja.AMAZON]: {
    nome: 'Amazon',
    cor: '#FF9900',
    icone: 'images/stores/amazon.png',
    temAutomacao: true
  },
  [Loja.KABUM]: {
    nome: 'Kabum',
    cor: '#FF6500',
    icone: 'images/stores/kabum.jpg',
    temAutomacao: true
  },
  [Loja.MERCADO_LIVRE]: {
    nome: 'Mercado Livre',
    cor: '#FFE600',
    icone: 'images/stores/mercado-livre.png',
    temAutomacao: true
  },
  [Loja.DESCONHECIDA]: {
    nome: 'Outra Loja',
    cor: '#6C757D',
    icone: 'fas fa-question-circle',
    temAutomacao: false
  }
};
