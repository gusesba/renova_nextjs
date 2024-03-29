export const optionsProduct = [
  'Calca',
  'Bermuda',
  'Shorts',
  'Pantacourt',
  'Saia',
  'Sapato',
  'Sandalia',
  'Sapatilha',
  'Peeptoe',
  'Tamanco',
  'Mullet',
  'Chinelo',
  'Tenis',
  'Sapatenis',
  'Bota',
  'Calcado',
  'Boots',
  'Vestido',
  'Blusa',
  'Camiseta',
  'Regata',
  'Casaco',
  'Cinto',
  'Poncho',
  'Manta',
  'Paschmina',
  'Echarpe',
  'Brinco',
  'Anel',
  'Pulseira',
  'Colar',
  'Relogio',
  'Oculos',
  'Biquini',
  'Maio',
  'Body',
  'Legging',
  'Sobretudo',
  'Blazer',
  'Cropped',
  'Top',
  'Sutia',
  'Calcinha',
  'Meia',
  'Cueca',
  'Calcao',
  'Saida',
  'Chapeu',
  'Bone',
  'Viseira',
  'Touca',
  'Tiara',
  'Bolsa',
  'Carteira',
  'Necessaire',
  'Basica',
  'Pijama',
  'Camisola',
  'Roupao',
  'Kimono',
  'Camisa',
  'Colete',
  'Conjunto',
  'Jaqueta',
  'Macacao',
  'Calcinha',
  'Rasteira',
  'Macaquinho',
  'Moletom',
  'Pantalona',
  'Pulover',
  'Outro',
].map((item) => {
  return {
    value: item,
    label: item,
    target: {
      name: 'product',
      value: item,
    },
  };
});

export const optionsSize = [
  'PP',
  'P',
  'M',
  'G',
  'GG',
  'EXG',
  '2',
  '3',
  '4',
  '5',
  '6',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  'Unico',
  'Outro',
].map((item) => {
  return {
    value: item,
    label: item,
    target: {
      name: 'size',
      value: item,
    },
  };
});

export const optionsColor = [
  'Azul',
  'Amarelo',
  'Preto',
  'Branco',
  'Caramelo',
  'Mostarda',
  'Estampado',
  'Colorido',
  'Vermelho',
  'Roxo',
  'Lilas',
  'Rosa',
  'Pink',
  'Laranja',
  'Verde',
  'Bege',
  'Creme',
  'Cinza',
  'Chumbo',
  'Jeans',
  'Marrom',
  'Uva',
  'Xadrez',
  'Listras',
  'Marinho',
  'Nude',
  'Dourado',
  'Bronze',
  'Prata',
  'Bordo',
  'Animal',
  'Preto e Branco',
  'Flores',
  'Perola',
  'Outro',
].map((item) => {
  return {
    value: item,
    label: item,
    target: {
      name: 'color',
      value: item,
    },
  };
});

export const optionsSell = ['Venda', 'Emprestimo', 'Devolucao', 'Doacao'].map(
  (item) => {
    return {
      value: item,
      label: item,
      target: {
        name: 'type',
        value: item,
      },
    };
  }
);
